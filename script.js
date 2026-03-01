// دالة تحديد النوع (Donor/Charity)
function selectType(type) {
    const donorEl = document.getElementById('type-donor');
    const charityEl = document.getElementById('type-charity');

    // هنا الحل: بنفحص الأول لو العناصر موجودة في الصفحة الحالية
    if (donorEl && charityEl) {
        donorEl.classList.toggle('active', type === 'donor');
        charityEl.classList.toggle('active', type === 'charity');
        // لو عندك متغير اسمه selectedType معرفه فوق، حدثه هنا
        if (typeof selectedType !== 'undefined') selectedType = type;
    }
}

// كود القائمة (Navbar) والتحقق من وجود العناصر
document.addEventListener("DOMContentLoaded", function () {
    // 1. تشغيل النوع الافتراضي فقط لو العناصر موجودة
    if (document.getElementById('type-donor')) {
        selectType('donor');
    }

    // 2. كود القائمة الجانبية (Menu Toggle)
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.onclick = function(e) {
            e.stopPropagation();
            navLinks.classList.toggle("active");
            this.classList.toggle("active");
        };

        document.addEventListener("click", function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
            }
        });
    }
});
let selectedAccountType = 'donor';

/**
 * وظيفة اختيار نوع الحساب
 */
function selectType(type) {
    selectedAccountType = type;
    document.querySelectorAll('.type-card').forEach(card => card.classList.remove('active'));
    document.getElementById(`type-${type}`).classList.add('active');

    const donorFields = document.getElementById('donor-fields');
    const charityFields = document.getElementById('charity-fields');
    const confirmTypeText = document.getElementById('confirm-type');

    if (type === 'charity') {
        donorFields.style.display = 'none';
        charityFields.style.display = 'block';
        confirmTypeText.innerText = 'جمعية خيرية';
    } else {
        donorFields.style.display = 'block';
        charityFields.style.display = 'none';
        confirmTypeText.innerText = 'متبرع';
    }
}

/**
 * وظيفة التنقل مع التحقق الذكي من البيانات
 */
function nextStep(step) {
    const activeStep = document.querySelector('.form-step.active');
    const currentStepNum = parseInt(activeStep.id.replace('step', ''));

    // التحقق فقط عند التقدم للأمام
    if (step > currentStepNum) {
        const validation = validateStep(activeStep);
        if (!validation.isValid) {
            alert(validation.message);
            return; 
        }
    }

    // تنفيذ الانتقال
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    updateProgressDots(step);
    document.querySelector('.auth-card').scrollIntoView({ behavior: 'smooth' });
}

/**
 * دالة التحقق من صحة البيانات (إيميل، هاتف، اسم)
 */
function validateStep(stepElement) {
    let result = { isValid: true, message: "" };
    const inputs = stepElement.querySelectorAll('input:not([type="checkbox"]), select');

    // أنماط التحقق (Regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(05|01)[0-9]{8,9}$/; // يدعم صيغ السعودية ومصر كمثال

    inputs.forEach(input => {
        if (input.offsetParent !== null) { // الحقول الظاهرة فقط
            const value = input.value.trim();
            let isFieldValid = true;

            // 1. التأكد من أن الحقل ليس فارغاً
            if (value === "") {
                isFieldValid = false;
                result.message = "يرجى ملء جميع الحقول المطلوبة.";
            } 
            // 2. التحقق من الإيميل
            else if (input.type === "email" && !emailPattern.test(value)) {
                isFieldValid = false;
                result.message = "يرجى إدخال بريد إلكتروني صحيح (مثال: name@mail.com).";
            }
            // 3. التحقق من رقم الجوال
            else if (input.type === "tel" && !phonePattern.test(value)) {
                isFieldValid = false;
                result.message = "يرجى إدخال رقم جوال صحيح.";
            }
            // 4. التحقق من الاسم (على الأقل حرفين)
            else if (input.placeholder.includes("الاسم") && value.length < 2) {
                isFieldValid = false;
                result.message = "الاسم يجب أن يكون حرفين على الأقل.";
            }
            // 5. التحقق من كلمة المرور (على الأقل 6 رموز)
            else if (input.type === "password" && value.length < 6) {
                isFieldValid = false;
                result.message = "كلمة المرور يجب ألا تقل عن 6 رموز.";
            }

            // تلوين الحقل بناءً على صحته
            if (!isFieldValid) {
                input.style.borderColor = "#ff4d4d";
                input.style.backgroundColor = "#fff8f8";
                result.isValid = false;
            } else {
                input.style.borderColor = "#eee";
                input.style.backgroundColor = "#fff";
            }
        }
    });
    return result;
}

function updateProgressDots(step) {
    for (let i = 1; i <= 3; i++) {
        const dot = document.getElementById(`dot${i}`);
        if (i <= step) dot.classList.add('active');
        else dot.classList.remove('active');
    }
}

function checkPwd(input) {
    const val = input.value;
    const container = input.closest('.form-group');
    const bars = container.querySelectorAll('.pwd-bar');
    const label = container.querySelector('.pwd-label');
    
    if (val.length === 0) {
        bars.forEach(b => b.style.backgroundColor = '#eee');
        label.innerText = 'ضعيف';
    } else if (val.length < 6) {
        bars[0].style.backgroundColor = '#ff4d4d';
        label.innerText = 'ضعيف';
    } else if (val.length < 10) {
        bars[0].style.backgroundColor = '#ffd11a';
        bars[1].style.backgroundColor = '#ffd11a';
        label.innerText = 'متوسط';
    } else {
        bars.forEach(b => b.style.backgroundColor = '#2ebf91');
        label.innerText = 'قوي جداً';
    }
}
