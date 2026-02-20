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
