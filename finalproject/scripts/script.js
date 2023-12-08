const url = 

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
     throw new Error('HTTP error ' + response.status);
  }
  return response.json();
 }
 
 function displayTable(json) {
  let html = '<table class="table"><thead><tr><th>Rental Type</th><th>Max Persons</th><th>Reservation Pricing (Half Day / Full Day)</th><th>Walk-in Pricing (Half Day / Full Day)</th></tr></thead><tbody>';
 
  json.rental_type.forEach((type, index) => {
     html += `<tr><td>${type}</td><td>${json.max_persons[index]}</td><td>${json.reservation_pricing[index].half_day} / ${json.reservation_pricing[index].full_day}</td><td>${json.walk_in_pricing[index].half_day} / ${json.walk_in_pricing[index].full_day}</td></tr>`;
  });
 
  html += '</tbody></table>';
 
  document.getElementById('pricing').innerHTML = html;
 }
 
 (async () => {
  try {
     const data = await fetchData('data.json');
     displayTable(data);
  } catch (error) {
     console.error('There was a problem with the fetch operation: ', error);
  }
 })();