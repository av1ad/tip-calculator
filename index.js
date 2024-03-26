document.addEventListener('DOMContentLoaded', function() {
    const billInput = document.getElementById('bill-input');
    const peopleInput = document.getElementById('people-input');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const tipResults = document.querySelectorAll('.tip-result');
    const resetButton = document.getElementById('reset-btn');
    const cantBeZero = document.querySelector('.cant-be-zero')
  
    let selectedTip = 0.15;
  
    tipButtons.forEach(button => {
      button.addEventListener('click', function() {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        selectedTip = parseFloat(this.textContent) / 100;
        calculateTip();
      });
    });
  
    billInput.addEventListener('input', calculateTip);
    peopleInput.addEventListener('input', calculateTip);
  
    resetButton.addEventListener('click', resetCalculator);
  
    function calculateTip() {
      const billAmount = parseFloat(billInput.value);
      const peopleCount = parseInt(peopleInput.value);
  
      if (billAmount && peopleCount) {
        const tipAmount = billAmount * selectedTip;
        const totalAmount = billAmount + tipAmount;
        const tipPerPerson = tipAmount / peopleCount;
        const totalPerPerson = totalAmount / peopleCount;
  
        tipResults[0].textContent = `$${tipPerPerson.toFixed(2)}`;
        tipResults[1].textContent = `$${totalPerPerson.toFixed(2)}`;
      }
    }

    peopleInput.addEventListener('input', function() {
        if (parseInt(peopleInput.value, 10) === 0) {
          cantBeZero.style.display = 'block';
          peopleInput.style.border = '2px solid red';
        } else {
          cantBeZero.style.display = 'none';
          peopleInput.style.border = 'none';
        }
        calculateTip();
      });
      
  
    function resetCalculator() {
      billInput.value = '';
      peopleInput.value = '';
      tipButtons[2].click();
      tipResults[0].textContent = '$0.00';
      tipResults[1].textContent = '$0.00';
    }
  });
  