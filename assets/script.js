// these are the events added to html through javascript
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('color-modal');
    const openModalButton = document.getElementById('open-modal');
    const closeModalButtons = document.querySelectorAll('#close-modal, #close-modal-footer');
    const applyColorButton = document.getElementById('apply-color');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const colorDisplay = document.getElementById('color-display');
    const complementaryColorDisplay = document.getElementById('complementary-color-display');
    const pinterestGrid = document.getElementById('pinterest-grid');

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

    // Color name mapping for search queries
    const colorNames = {
        maroon: 'maroon',
        lightblue: 'light blue',
        navy: 'navy',
        darkgreen: 'olive green',
        grey: 'grey',
        purple: 'purple',
        coral: 'coral',
        teal: 'teal',
        gold: 'gold',
        silver: 'silver',
        olive: 'olive',
        salmon: 'salmon',
        indigo: 'indigo',
        lavender: 'lavender',
        '#98FF98': 'mint',
        '#FFDAB9': 'peach',
        '#FF007F': 'rose',
        '#708090': 'slate',
        turquoise: 'turquoise',
        violet: 'violet'
    };

    let selectedColor = null;

    // Function to fetch Pinterest images
    async function fetchPinterestImages(color1, color2) {
        const colorName1 = colorNames[color1] || color1;
        const colorName2 = colorNames[color2] || color2;
        
        // Clear existing images
        pinterestGrid.innerHTML = '';
        
        // Create a loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'column is-12 has-text-centered';
        loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin fa-2x"></i>';
        pinterestGrid.appendChild(loadingDiv);

        try {
            // Create search queries
            const searchQueries = [
                `${colorName1} ${colorName2} fashion outfit`,
                `${colorName1} ${colorName2} clothing style`,
                `${colorName1} ${colorName2} fashion look`
            ];

            // Use Pexels API
            const apiKey = 'Mcgo3wXzm6w26p7GFvYm2dv8DiprXmNvlEdXRuj1sbLyePgH09c2NCrL';
            const query = searchQueries[Math.floor(Math.random() * searchQueries.length)];
            
            const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=6`, {
                headers: {
                    'Authorization': apiKey
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }

            const data = await response.json();
            
            // Clear loading indicator
            pinterestGrid.innerHTML = '';

            if (data.photos && data.photos.length > 0) {
                data.photos.forEach(photo => {
                    const column = document.createElement('div');
                    column.className = 'column is-4-mobile is-3-tablet is-2-desktop';
                    
                    const imageDiv = document.createElement('div');
                    imageDiv.className = 'pinterest-image';
                    
                    const img = document.createElement('img');
                    img.src = photo.src.medium;
                    img.alt = `${colorName1} and ${colorName2} fashion inspiration`;
                    img.loading = 'lazy';
                    
                    // Add error handling for images
                    img.onerror = function() {
                        this.src = `https://source.unsplash.com/featured/?${encodeURIComponent(query)}&fashion`;
                    };
                    
                    imageDiv.appendChild(img);
                    column.appendChild(imageDiv);
                    pinterestGrid.appendChild(column);
                });
            } else {
                // Fallback to Unsplash if no Pexels results
                const fallbackImages = [
                    `https://source.unsplash.com/featured/?${encodeURIComponent(query)}&fashion`,
                    `https://source.unsplash.com/featured/?${encodeURIComponent(query)}&clothing`,
                    `https://source.unsplash.com/featured/?${encodeURIComponent(query)}&style`,
                    `https://source.unsplash.com/featured/?${encodeURIComponent(query)}&outfit`,
                    `https://source.unsplash.com/featured/?${encodeURIComponent(query)}&fashion`,
                    `https://source.unsplash.com/featured/?${encodeURIComponent(query)}&clothing`
                ];

                fallbackImages.forEach((url, index) => {
                    const column = document.createElement('div');
                    column.className = 'column is-4-mobile is-3-tablet is-2-desktop';
                    
                    const imageDiv = document.createElement('div');
                    imageDiv.className = 'pinterest-image';
                    
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = `${colorName1} and ${colorName2} fashion inspiration`;
                    img.loading = 'lazy';
                    
                    imageDiv.appendChild(img);
                    column.appendChild(imageDiv);
                    pinterestGrid.appendChild(column);
                });
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            pinterestGrid.innerHTML = `
                <div class="column is-12 has-text-centered">
                    <p class="subtitle is-6">No images found for this color combination.</p>
                    <p class="subtitle is-6">Try selecting different colors!</p>
                </div>
            `;
        }
    }

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

            // Fetch Pinterest images
            fetchPinterestImages(selectedColor, complementaryColor);

            modal.classList.remove('is-active');
        }
    });
});
