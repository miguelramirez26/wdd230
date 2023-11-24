// --- SPOTLIGHT INFO ---
const url = 'https://miguelramirez26.github.io/wdd230/chamber/data/members.json';
const spotlightContainer = document.querySelector('.spotlight-container');

const displayCompanies = (companies) => {
    const filteredCompanies = companies.filte(company => company.membershiplevel === 2 || company.membershiplevel === 3);

    filteredCompanies.forEach((company) => {
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

async function getCompanyData() {
    const response = await fetch(url);
    const data = await response.json();
    displayCompanies(data.companies);
}

getCompanyData();