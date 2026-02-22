const donorsData = [
    {
        type: 'طعام',
        name: 'محمد محمود',
        date: '10/11/2025',
        value: 3000,
        count: 2
    },
    {
        type: 'طعام',
        name: 'رحمة احمد',
        date: '10/11/2025',
        value: 2000,
        count: 4
    },
    {
        type: 'طعام',
        name: 'رحمة احمد',
        date: '10/11/2025',
        value: 2000,
        count: 4
    },
];
const newDonationData = [
    {
        type: 'اغاثة مالية',
        name: 'رحمه احمد',
        status: 3000,
        value: 3,
        count: 'مرفوض'
    },
    {
        type: 'اغاثة مالية',
        name: 'رحمه احمد',
        status: 3000,
        value: 3,
        count: 'مرفوض'
    },
    {
        type: 'اغاثة مالية',
        name: 'رحمه احمد',
        status: 3000,
        value: 3,
        count: 'مرفوض'
    },
];
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('donationChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ناجحة', 'معلقة', 'ملغاة', 'مجموع'],
            datasets: [{
                label: 'التبرعات',
                data: [75, 10, 25, 40],
                backgroundColor: ['#4caf50', '#ffeb3b', '#9e9e9e', '#ffd54f'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
    const donorsTbody = document.querySelector('#donorsTable tbody');
    donorsData.forEach(donor => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${donor.type}</td>
        <td>${donor.name}</td>
        <td>${donor.count}</td>
        <td>${donor.value}L.E</td>
        <td>${donor.date}</td>
        `;
        donorsTbody.appendChild(row);
    });
    const newDonationsTbody = document.querySelector('#newDonationsTable tbody');
    newDonationData.forEach(donation => {
        const row = document.createElement('tr');
        let statusClass = "";
        if ('مرفوض' === donation.status) statusClass = 'cancelled';
        else if (donation.status === 'قيد المراجعة') statusClass = 'pending';
        else statusClass = 'success';
        row.innerHTML = `
        <td>${donation.type}<td>
        <td>${donation.name}<td>
        <td>${donation.count}<td>
        <td>${donation.value}L.E<td>
        <td><span class="status-badge"${donation.status}</span><td>`
        newDonationsTbody.appendChild(row);
    });
    document.getElementById('addDonorForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const type = document.getElementById('donationType').value;
        const name = document.getElementById('donorName').value;
        const count = document.getElementById('donationCount').value;
        const value = document.getElementById('donationValue').value;
        const date = document.getElementById('donationDate').value;
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <td>${type === 'food' ? 'طعام' : type === 'money' ? 'مال' : 'ملابس'}</td>
        <td>${name}<td>
        <td>${count}<td>
        <td>${value}L.E<td>
        <td>${date}<td>;`
        document.querySelector('#donorsTable tbody').prepend(newRow);
        e.this.reset();
        alert('تمت اضافة المتبرع بنجاح!')
    });
    document.getElementById('showMoreDonors').addEventListener('click', () => {
        alert('...سيتم تحميل المزيد من البيانات')
    });
    document.getElementById('showMoreNew').addEventListener('click', () => {
        alert('سيتم تحميل المزيد من التبرعات الجديدة');
    });
});