
"use strict";

let selectedAccountType = "donor";

document.addEventListener("DOMContentLoaded", function () {
  selectType("donor");
  updateProgressDots(1);

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.onclick = function (e) {
      e.stopPropagation();
      navLinks.classList.toggle("active");
      this.classList.toggle("active");
    };

    document.addEventListener("click", function (e) {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  }

  const submitBtn = document.querySelector('#step3 button[type="submit"], #step3 .btn-submit[type="submit"]');
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      handleSubmit();
    });
  }
});

function selectType(type) {
  selectedAccountType = type;

  document.querySelectorAll(".type-card").forEach((card) => card.classList.remove("active"));
  const typeCard = document.getElementById(`type-${type}`);
  if (typeCard) typeCard.classList.add("active");

  const donorFields = document.getElementById("donor-fields");
  const charityFields = document.getElementById("charity-fields");
  const confirmTypeText = document.getElementById("confirm-type");

  if (donorFields && charityFields) {
    if (type === "charity") {
      donorFields.style.display = "none";
      charityFields.style.display = "block";
      if (confirmTypeText) confirmTypeText.innerText = "جمعية خيرية";
    } else {
      donorFields.style.display = "block";
      charityFields.style.display = "none";
      if (confirmTypeText) confirmTypeText.innerText = "متبرع";
    }
  }

  document.querySelectorAll('#step2 input, #step2 select').forEach((el) => {
    el.style.borderColor = "#eee";
    el.style.backgroundColor = "#fff";
  });
}

function nextStep(step) {
  const activeStep = document.querySelector(".form-step.active");
  if (!activeStep) return;

  const currentStepNum = parseInt(activeStep.id.replace("step", ""), 10);

  if (step > currentStepNum) {
    const validation = validateStep(activeStep);
    if (!validation.isValid) {
      alert(validation.message || "يرجى مراجعة الحقول وإكمال المطلوب.");
      if (validation.firstInvalid) {
        validation.firstInvalid.focus({ preventScroll: false });
        validation.firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
  }

  document.querySelectorAll(".form-step").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(`step${step}`);
  if (target) {
    target.classList.add("active");
    updateProgressDots(step);
    document.querySelector(".auth-card")?.scrollIntoView({ behavior: "smooth" });
  }

  if (step === 3) {
    const data = gatherFormData();
    fillConfirmation(data);
  }
}

function validateStep(stepElement) {
  const result = { isValid: true, message: "", firstInvalid: null };
  const inputsAll = stepElement.querySelectorAll('input:not([type="checkbox"]), select');
  const visible = Array.from(inputsAll).filter((el) => el.offsetParent !== null);

  const setInvalid = (input, msg) => {
    input.style.borderColor = "#ff4d4d";
    input.style.backgroundColor = "#fff8f8";
    if (!result.firstInvalid) result.firstInvalid = input;
    result.isValid = false;
    result.message = msg;
  };

  const setValid = (input) => {
    input.style.borderColor = "#eee";
    input.style.backgroundColor = "#fff";
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^(05|01)[0-9]{8,9}$/;
  const stepId = stepElement.id;

  if (stepId === "step1") {
    for (const input of visible) {
      const val = (input.value || "").trim();
      if (val === "") {
        setInvalid(input, "يرجى ملء جميع الحقول المطلوبة.");
        continue;
      }
      if (input.type === "email" && !emailPattern.test(val)) {
        setInvalid(input, "يرجى إدخال بريد إلكتروني صحيح.");
        continue;
      }
      if (input.type === "tel" && !phonePattern.test(val)) {
        setInvalid(input, "يرجى إدخال رقم جوال صحيح.");
        continue;
      }
      if (input.type === "text") {
        const labelTxt = input.closest(".form-group")?.querySelector("label")?.innerText || "";
        if ((/الاسم/i).test(labelTxt) && val.length < 2) {
          setInvalid(input, "الاسم يجب أن يكون حرفين على الأقل.");
          continue;
        }
      }
      setValid(input);
    }
    return result;
  }

  if (stepId === "step2") {
    const skipCityForDonor = selectedAccountType === "donor";
    const passwords = [];

    for (const input of visible) {
      const val = (input.value || "").trim();
      const labelTxt = input.closest(".form-group")?.querySelector("label")?.innerText || "";

      if (skipCityForDonor && /المدينة/.test(labelTxt)) {
        setValid(input);
        continue;
      }

      if (val === "") {
        setInvalid(input, "يرجى ملء جميع الحقول المطلوبة.");
        continue;
      }

      if (input.type === "password") {
        passwords.push(input);
        if (val.length < 6) {
          setInvalid(input, "كلمة المرور يجب ألا تقل عن ٦ رموز.");
          continue;
        }
      }

      setValid(input);
    }

    if (passwords.length >= 2) {
      const pwd = passwords[0].value.trim();
      const pwdConfirm = passwords[1].value.trim();
      if (pwd !== pwdConfirm) {
        setInvalid(passwords[1], "كلمتا المرور غير متطابقتين.");
      }
    }

    return result;
  }

  return result;
}

function gatherFormData() {
  const step1 = document.getElementById("step1");
  const textInputs = step1.querySelectorAll('input[type="text"]');
  const firstName = (textInputs[0]?.value || "").trim();
  const lastName = (textInputs[1]?.value || "").trim();
  const email = (step1.querySelector('input[type="email"]')?.value || "").trim();
  const phone = (step1.querySelector('input[type="tel"]')?.value || "").trim();

  return {
    fullName: `${firstName} ${lastName}`.trim(),
    email,
    phone
  };
}

function fillConfirmation(data) {
  const infoBox = document.querySelector('#step3 > div:nth-child(2)');
  if (!infoBox) return;
  const rows = Array.from(infoBox.children).filter(el => el.tagName === 'DIV');

  const nameRow = rows[1];
  const emailRow = rows[2];
  const phoneRow = rows[3];

  if (nameRow) {
    const spans = nameRow.querySelectorAll('span');
    if (spans[1]) spans[1].innerText = data.fullName || "—";
  }
  if (emailRow) {
    const spans = emailRow.querySelectorAll('span');
    if (spans[1]) spans[1].innerText = data.email || "—";
  }
  if (phoneRow) {
    const spans = phoneRow.querySelectorAll('span');
    if (spans[1]) spans[1].innerText = data.phone || "—";
  }
}

function handleSubmit() {
  const terms = document.getElementById("terms");
  if (terms && !terms.checked) {
    alert("يجب الموافقة على الشروط والأحكام أولاً.");
    terms.focus();
    return;
  }
  window.location.href = "login.html";
}

function updateProgressDots(step) {
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById(`dot${i}`);
    if (!dot) continue;
    if (i <= step) dot.classList.add("active");
    else dot.classList.remove("active");
  }
}

function checkPwd(input) {
  const val = input.value || "";
  const container = input.closest(".form-group");
  if (!container) return;

  const bars = container.querySelectorAll(".pwd-bar");
  const label = container.querySelector(".pwd-label");

  bars.forEach((b) => (b.style.backgroundColor = "#eee"));
  if (label) label.innerText = "ضعيف";

  if (val.length === 0) return;
  if (val.length < 6) {
    if (bars[0]) bars[0].style.backgroundColor = "#ff4d4d";
    if (label) label.innerText = "ضعيف";
  } else if (val.length < 10) {
    if (bars[0]) bars[0].style.backgroundColor = "#ffd11a";
    if (bars[1]) bars[1].style.backgroundColor = "#ffd11a";
    if (label) label.innerText = "متوسط";
  } else {
    bars.forEach((b) => (b.style.backgroundColor = "#2ebf91"));
    if (label) label.innerText = "قوي جداً";
  }
}
