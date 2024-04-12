const BASE_URL = 'http://localhost:3000/brewcompanies';

document.addEventListener('DOMContentLoaded', () => {
    getBreweries();
});

function getBreweries() {
    fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => res.json())
        .then((breweries) => {
            const breweriesByType = groupBreweriesByType(breweries);
            Object.entries(breweriesByType).forEach(([type, breweries]) => {
                giveBreweries(type, breweries);
            });
        })
        .catch((err) => console.log(err));
}

function groupBreweriesByType(breweries) {
    return breweries.reduce((grouped, brewery) => {
        const type = brewery.brewery_type;
        if (!grouped[type]) {
            grouped[type] = [];
        }
        grouped[type].push(brewery);
        return grouped;
    }, {});
}

function giveBreweries(type, breweries) {
    const container = document.querySelector('.container');

    const dropdownDiv = document.createElement('div');
    dropdownDiv.classList.add('dropdown');

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
    toggleButton.setAttribute('type', 'button');
    toggleButton.setAttribute('data-bs-toggle', 'dropdown');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.textContent = type;

    const dropdownMenu = document.createElement('ul');
    
    dropdownMenu.classList.add('dropdown-menu');

    breweries.forEach((brewery) => {
        const breweryItem = document.createElement('li');
        breweryItem.classList.add('dropdown-item');

        const breweryLink = document.createElement('a');
        breweryLink.href = brewery.website_url;
        breweryLink.textContent = brewery.name;

        breweryItem.appendChild(breweryLink);
        dropdownMenu.appendChild(breweryItem);
    });

    dropdownDiv.appendChild(toggleButton);
    dropdownDiv.appendChild(dropdownMenu);

    container.appendChild(dropdownDiv);
}
