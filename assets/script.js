// these are the events added to html through javascript
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('color-modal');
    const openModalButton = document.getElementById('open-modal');
    const closeModalButtons = document.querySelectorAll('#close-modal, #close-modal-footer');
    const applyColorButton = document.getElementById('apply-color');
    const colorSelect = document.getElementById('color-select');
    const colorDisplay = document.getElementById('color-display');
    const complementaryColorDisplay = document.getElementById('complementary-color-display');


    // create or change the second color
    const complementaryColors = {
        maroon: '#FFFDD0', // cream
        lightblue: '#987A5C', //Khaki
        navy: '#d3a200', // Mustard
        darkgreen: '#000000', // black
        grey: '#EFA498', // Pastel Peach
        purple: '#FFFF00', // Purple
    };

    // Load saved color on page load with local storage
    const savedColor = localStorage.getItem('selectedColor');
    const savedComplementaryColor = localStorage.getItem('complementaryColor');
    if (savedColor) {
        colorDisplay.style.backgroundColor = savedColor;
    }
    if (savedComplementaryColor) {
        complementaryColorDisplay.style.backgroundColor = savedComplementaryColor;
    }

    // Open modal
    openModalButton.addEventListener('click', () => {
        modal.classList.add('is-active');
    });

    // Close modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('is-active');
        });
    });

    // Apply selected color
    applyColorButton.addEventListener('click', () => {
        const selectedColor = colorSelect.value;
        const complementaryColor = complementaryColors[selectedColor] || '#ffffff';

        // Update displays
        colorDisplay.style.backgroundColor = selectedColor;
        complementaryColorDisplay.style.backgroundColor = complementaryColor;

        // Save to local storage
        localStorage.setItem('selectedColor', selectedColor);
        localStorage.setItem('complementaryColor', complementaryColor);

        modal.classList.remove('is-active');
    });
});
