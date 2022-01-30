/// Implement the behavior that giving the focus to one of the form inputs clear the error
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const clearError = () => document.querySelector('.alert').remove();

amount.addEventListener('focus', () => clearError())
interest.addEventListener('focus', () => clearError())
years.addEventListener('focus', () => clearError())

const errorAlreadyDisplayed = () => {
    return !!document.querySelector('.alert');
}

const hideResults = () => document.getElementById('results').style.display = 'none';
const showResults = () => document.getElementById('results').style.display = 'block';
const startLoading = () => document.getElementById('loading').style.display = 'block';
const stopLoading = () => document.getElementById('loading').style.display = 'none'

const showError = error => {
    /// create a div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    /// insert error above heading
    card.insertBefore(errorDiv, heading);
}

document.getElementById('loan-form').addEventListener('submit', e => {
    hideResults();
    startLoading();
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

function calculateResults()  {
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
        if(!errorAlreadyDisplayed())
            showError('Please check your numbers');
    }
    showResults();
    stopLoading();
}