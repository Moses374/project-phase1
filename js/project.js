const BASE_URL = 'http://localhost:3000/brewcompanies';

document.addEventListener('DOMContentLoaded', () => {
    fetch(BASE_URL)
        .then(response => response.json())
        .then(data => {
            const groupedBreweries = groupBreweriesByType(data);
            renderBreweries(groupedBreweries);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function groupBreweriesByType(breweries) {
    const grouped = {};
    breweries.forEach(brewery => {
        const type = brewery.brewery_type;
        if (!grouped[type]) {
            grouped[type] = [];
        }
        grouped[type].push(brewery);
    });
    return grouped;
}

function renderBreweries(groupedBreweries) {
    const container = document.querySelector('#breweries');
    Object.entries(groupedBreweries).forEach(([type, breweries]) => {
        const dropdown = createDropdown(type, breweries);
        container.appendChild(dropdown);
    });
}

function createDropdown(type, breweries) {
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
    toggleButton.setAttribute('type', 'button');
    toggleButton.setAttribute('data-bs-toggle', 'dropdown');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.textContent = type;

    const dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu');

    breweries.forEach(brewery => {
        const listItem = document.createElement('li');
        listItem.classList.add('dropdown-item');

        const link = document.createElement('a');
        link.href = brewery.website_url;
        link.textContent = brewery.name;

        listItem.appendChild(link);
        dropdownMenu.appendChild(listItem);
    });

    dropdown.appendChild(toggleButton);
    dropdown.appendChild(dropdownMenu);
    return dropdown;
}