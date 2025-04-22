// these are the events added to html through javascript
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('color-modal');
    const openModalButton = document.getElementById('open-modal');
    const closeModalButtons = document.querySelectorAll('#close-modal, #close-modal-footer');
    const applyColorButton = document.getElementById('apply-color');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const colorDisplay = document.getElementById('color-display');
    const complementaryColorDisplay = document.getElementById('complementary-color-display');

    // create or change the second color
    const complementaryColors = {
        maroon: '#FFFDD0', // cream
        lightblue: '#987A5C', // Khaki
        navy: '#d3a200', // Mustard
        darkgreen: '#000000', // black
        grey: '#EFA498', // Pastel Peach
        purple: '#FFFF00', // Yellow
        coral: '#00FFFF', // Cyan
        teal: '#FFA07A', // Light Salmon
        gold: '#000080', // Navy Blue
        silver: '#800080', // Purple
        olive: '#FF00FF', // Magenta
        salmon: '#00FF00', // Lime
        indigo: '#FFA500', // Orange
        lavender: '#008000', // Green
        '#98FF98': '#FF69B4', // Mint -> Hot Pink
        '#FFDAB9': '#4169E1', // Peach -> Royal Blue
        '#FF007F': '#32CD32', // Rose -> Lime Green
        '#708090': '#FFD700', // Slate -> Gold
        turquoise: '#FF4500', // Orange Red
        violet: '#00FF7F', // Spring Green
    };

    let selectedColor = null;

    // Load saved color on page load with local storage
    const savedColor = localStorage.getItem('selectedColor');
    const savedComplementaryColor = localStorage.getItem('complementaryColor');
    if (savedColor) {
        colorDisplay.style.backgroundColor = savedColor;
        // Highlight the saved color swatch
        const savedSwatch = document.querySelector(`.color-swatch[data-color="${savedColor}"]`);
        if (savedSwatch) {
            savedSwatch.classList.add('selected');
            selectedColor = savedColor;
        }
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

    // Handle color swatch selection
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // Remove selected class from all swatches
            colorSwatches.forEach(s => s.classList.remove('selected'));
            // Add selected class to clicked swatch
            swatch.classList.add('selected');
            selectedColor = swatch.dataset.color;
        });
    });

    // Apply selected color
    applyColorButton.addEventListener('click', () => {
        if (selectedColor) {
            const complementaryColor = complementaryColors[selectedColor] || '#ffffff';

            // Update displays
            colorDisplay.style.backgroundColor = selectedColor;
            complementaryColorDisplay.style.backgroundColor = complementaryColor;

            // Save to local storage
            localStorage.setItem('selectedColor', selectedColor);
            localStorage.setItem('complementaryColor', complementaryColor);

            modal.classList.remove('is-active');
        }
    });
});
