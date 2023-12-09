const url = 'https://raw.githubusercontent.com/miguelramirez26/wdd230/main/finalproject/data/pricing.json';
const pricingTable = document.querySelector('#pricing');

const displayPricing = (pricingData) => {
  // Create caption element for the table
  let caption = document.createElement('caption');
  caption.textContent = 'Max Rental Pricing';

  // Append the caption to the table
  pricingTable.appendChild(caption);

  // Create thead and tbody elements
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  // Create thead rows and cells
  let theadRow1 = document.createElement('tr');
  let theadRow2 = document.createElement('tr');
  let rentalTypeTh = document.createElement('th');
  let maxPersonsTh = document.createElement('th');
  let reservationTh = document.createElement('th');
  let walkInTh = document.createElement('th');

  rentalTypeTh.textContent = 'Rental Type';
  maxPersonsTh.textContent = 'Max. Persons';
  reservationTh.textContent = 'Reservation';
  walkInTh.textContent = 'Walk-In';

  theadRow1.appendChild(rentalTypeTh);
  theadRow1.appendChild(maxPersonsTh);
  theadRow1.appendChild(reservationTh);
  theadRow1.appendChild(walkInTh);

  theadRow2.innerHTML = '<th>Half Day (3 hrs)</th><th>Full Day</th><th>Half Day (3 hrs)</th><th>Full Day</th>';

  thead.appendChild(theadRow1);
  thead.appendChild(theadRow2);

  // Append thead to the table
  pricingTable.appendChild(thead);

  pricingData.rental_type.forEach((rental, index) => {
    let row = document.createElement('tr');
    let rentalTypeCell = document.createElement('td');
    let maxPersonsCell = document.createElement('td');
    let reservationPricingCell1 = document.createElement('td');
    let reservationPricingCell2 = document.createElement('td');
    let maxRentalPricingCell1 = document.createElement('td');
    let maxRentalPricingCell2 = document.createElement('td');

    rentalTypeCell.textContent = `${rental}`;
    maxPersonsCell.textContent = `${pricingData.max_persons[index]}`;
    reservationPricingCell1.textContent = `${pricingData.reservation_pricing[index].half_day}`;
    reservationPricingCell2.textContent = `${pricingData.reservation_pricing[index].full_day}`;
    maxRentalPricingCell1.textContent = `${pricingData.walk_in_pricing[index].half_day}`;
    maxRentalPricingCell2.textContent = `${pricingData.walk_in_pricing[index].full_day}`;

    row.appendChild(rentalTypeCell);
    row.appendChild(maxPersonsCell);
    row.appendChild(reservationPricingCell1);
    row.appendChild(reservationPricingCell2);
    row.appendChild(maxRentalPricingCell1);
    row.appendChild(maxRentalPricingCell2);

    tbody.appendChild(row);
  });

  // Append tbody to the table
  pricingTable.appendChild(tbody);
}

async function getPricingData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data. HTTP error ' + response.status);
    }
    const data = await response.json();
    displayPricing(data);
  } catch (error) {
    console.error('Error fetching pricing data: ', error);
  }
}

getPricingData();