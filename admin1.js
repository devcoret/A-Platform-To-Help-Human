const donationsData = [
    {
        type: 'التبرع الاول',
        donationType: 'اعانة اغاثية',
        paymentMethod: 'محفظة الكترونية',
        amount: '500 جنيها'
    },
    {
        type: 'التبرع الاول',
        donationType: 'اعانة اغاثية',
        paymentMethod: 'محفظة الكترونية',
        amount: '500 جنيها'
    },
    {
        type: 'التبرع الاول',
        donationType: 'اعانة اغاثية',
        paymentMethod: 'محفظة الكترونية',
        amount: '500 جنيها'
    },
];
// const donationsListElement = document.getElementById('donations-list');
// const totalCountElement = document.getElementById('total-count');
function createDonationCard(data) {
    const card = document.createElement('div');
    card.className = 'donation-card';
    card.innerHTML = `
       <div class="badge-container">
       <span class="badge">${data.type}</span>
       </div>
       <div style="padding-top:20px;">
      <div class="data-row">
     <span class ="label">${data.donationType}</span>
        <span class="value">نوع التبرع</span>
      </div>
      <div class="data-row">
         <span class ="label">${data.paymentMethod}</span>
         <span class="value">طريقه الدفع</span>
       </div>
       <div class="data-row">
         <span class ="label">${data.amount}</span>
          <span class="value">المبلغ</span>
      </div>
      </div>`;
    return card;
};
document.addEventListener('DOMContentLoaded', function () {
    const donationsListElement = document.getElementById('donations-list');
    const totalCountElement = document.getElementById('total-count');
    donationsData.forEach(donation => {
        const cardElement = createDonationCard(donation);
        donationsListElement.appendChild(cardElement);
    });
    totalCountElement.textContent = `${donationsData.length}عدد التبرعات المعروضة`
});