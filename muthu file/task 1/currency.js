const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

document.addEventListener('DOMContentLoaded', () => 
{
    fetch(apiUrl)
        .then(response => response.json())
        .then(data =>
            {
            const rates = data.rates;
            populateCurrencyOptions(rates);
            window.rates = rates; // Store rates globally for access in convert function
        })
        .catch(error =>
            {
            console.error('Error fetching exchange rates:', error);
        });
});

function populateCurrencyOptions(rates)
{
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    Object.keys(rates).forEach(currency =>
    {
        let option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });
}

function convert()
{
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!amount || fromCurrency === toCurrency) 
    {
        alert('Please enter a valid amount and choose different currencies.');
        return;
    }

    const result = (amount * window.rates[toCurrency] / window.rates[fromCurrency]).toFixed(2);
    document.getElementById('result').textContent = `Result: ${result} ${toCurrency}`;
}
