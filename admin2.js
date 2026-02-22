document.addEventListener("DOMContentLoaded", function () {
    const dataInput = document.getElementById('date');
    if (datyeInput) {
        const today = new Date().toISOString().split('T')[0];
        dataInput.value = today;
    }
    const imageUploadInput = document.getElementById('imageUpload');
    const imagePreviewContainer = document.getElementById('imagePreview Container');
    if (imageUploadInput && imagePreviewContainer) {
        imageUploadInput.addEventListener9('change', function (event) {
            imagePreviewContainer.innerHTML = '';
            const files = event.target.files;
            if (files.length > 0) {
                Array.from(files).forEach(file => {
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            const imgElement = document.createElement('img');
                            imgElement.src = e.target.result;
                            imgElement.classList.add('image-preview-item');
                            imagePreviewContainer.appendChild(imgElement)
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }
        });
    };
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(donationForm);
            const data = Object.fromEntries(formData.entries());
            console.log('بيانات النموج:data');
            alert("تم استلام بيانات التبرع بنجاح !(راجع وحده التحكم في المتصفح للتفاصيلconsole)")
        });
    }
});