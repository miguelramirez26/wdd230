const url = 'https://miguelramirez26.github.io/wdd230/chamber/data/members.json';
const spotlightContainer = document.querySelector('.spotlight-container');

const displayRandomCompanies = (companies) => {
    // Filter companies with silver (2) or gold (3) membership level
    const silverGoldCompanies = companies.filter(company => company.membershiplevel === 2 || company.membershiplevel === 3);

    // Shuffle the array to get a random order
    const shuffledCompanies = shuffleArray(silverGoldCompanies);

    // Select two to three companies
    const selectedCompanies = shuffledCompanies.slice(0, Math.min(3, shuffledCompanies.length));

    // Display the selected companies
    selectedCompanies.forEach((company) => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let portrait = document.createElement('img');
        let websiteurl = document.createElement('a');

        name.textContent = `${company.name}`;
        address.textContent = `${company.address}`;
        phone.textContent = `${company.phone}`;
        websiteurl.href = company.websiteurl;
        websiteurl.textContent = company.websiteurl;
        portrait.setAttribute('src', company.imageurl);
        portrait.setAttribute('alt', `Portrait of ${company.name}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', 'auto');

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(websiteurl);
        card.appendChild(portrait);

        spotlightContainer.appendChild(card);
    });
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function getCompanyData() {
    const response = await fetch(url);
    const data = await response.json();
    displayRandomCompanies(data.companies);
}

getCompanyData();
