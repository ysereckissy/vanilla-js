const showError = error => {
    /// create a div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    /// insert error above heading
    card.insertBefore(errorDiv, heading);
    /// Clear error after 3 seconds
    setTimeout(() => {
       document.querySelector('.alert').remove();
    }, 3000)
}

document.getElementById('loan-form').addEventListener('submit', e => {
    e.preventDefault();
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    /// compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);
    } else {
        showError('Please check your numbers');
    }
})