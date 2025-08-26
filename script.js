document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addItem');
    const userInput = document.getElementById('userInput');
    const myList = document.getElementById('myList');

    addButton.addEventListener('click', function() {
        const inputValue = userInput.value.trim();
        if (inputValue !== '') {
            const li = document.createElement('li');
            li.textContent = inputValue;
            myList.appendChild(li);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });
});