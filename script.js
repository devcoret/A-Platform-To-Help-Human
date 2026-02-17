
let selectedType = 'donor';

function selectType(type) {
  selectedType = type;
  document.getElementById('type-donor').classList.toggle('active', type === 'donor');
  document.getElementById('type-charity').classList.toggle('active', type === 'charity');
}

function nextStep(step) {
  // hide all
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step' + step).classList.add('active');

  // update progress
  document.querySelectorAll('.prog-dot').forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i + 1 < step) d.classList.add('done');
    if (i + 1 === step) d.classList.add('active');
  });

  // show right fields in step 2
  if (step === 2) {
    const isDonor = selectedType === 'donor';
    document.getElementById('donor-fields').style.display = isDonor ? 'block' : 'none';
    document.getElementById('charity-fields').style.display = isDonor ? 'none' : 'block';
  }

  // update confirm type
  if (step === 3) {
    document.getElementById('confirm-type').textContent = selectedType === 'donor' ? '💛 متبرع' : '🌿 جمعية خيرية';
  }
}

function checkPwd(el) {
  const val = el.value;
  const prefix = el.closest('#charity-fields') ? 'c' : '';
  const b1 = document.getElementById('bar1' + prefix);
  const b2 = document.getElementById('bar2' + prefix);
  const b3 = document.getElementById('bar3' + prefix);
  const lbl = document.getElementById('pwdLabel' + (prefix ? 'C' : ''));

  [b1, b2, b3].forEach(b => { b.className = 'pwd-bar'; });

  if (val.length === 0) { lbl.textContent = ''; return; }
  if (val.length < 6) {
    b1.classList.add('weak');
    lbl.textContent = 'ضعيف'; lbl.style.color = '#e53935';
  } else if (val.length < 10 || !/[A-Z]/.test(val) || !/[0-9]/.test(val)) {
    b1.classList.add('medium'); b2.classList.add('medium');
    lbl.textContent = 'متوسط'; lbl.style.color = '#c8a84b';
  } else {
    b1.classList.add('strong'); b2.classList.add('strong'); b3.classList.add('strong');
    lbl.textContent = 'قوي'; lbl.style.color = '#2e8b57';
  }
}

// preselect donor
selectType('donor');
