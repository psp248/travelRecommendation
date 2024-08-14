// script.js

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector('.search-bar button:nth-of-type(1)');
    const clearButton = document.querySelector('.search-bar button:nth-of-type(2)');
    const searchInput = document.querySelector('.search-bar input');
    const resultsContainer = document.querySelector('.results-container');

    let travelData = [];

    // Fetch data from JSON file
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            travelData = data;
            console.log(travelData); // Check if the data is fetched correctly
        })
        .catch(error => console.error('Error fetching data:', error));

    // Event listener for search button
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        displayResults(query);
    });

    // Event listener for clear button
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        resultsContainer.innerHTML = '';
    });

    // Function to display results
    function displayResults(query) {
        resultsContainer.innerHTML = '';
        const filteredData = travelData.filter(item => {
            return item.category.includes(query) || item.name.toLowerCase().includes(query);
        });

        if (filteredData.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        filteredData.forEach(item => {
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            resultCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Category: ${item.category}</p>
            `;
            resultsContainer.appendChild(resultCard);
        });
    }
});
