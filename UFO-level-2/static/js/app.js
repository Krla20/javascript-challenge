// from data.js
var tableData = data;

// Viewing the available data from the data.js
console.log(tableData);

// Creating references to tbody, input and bottom
let tbody = d3.select('tbody');
let button = d3.select('#filter-btn');
let inputFieldDate = d3.select('#datetime');
let inputFieldCity = d3.select('#city');
let inputFieldState = d3.select('#state');
let columns = ['datetime', 'city', 'state', 'country', 'shape', 'durationMinutes', 'comments']

// Input data into html
let addData = (dataInput) =>{
    dataInput.forEach(ufoSight => {
        let row = tbody.append('tr');
        columns.forEach(column => row.append('td').text(ufoSight[column]))
    });
}
addData(tableData);

/***************
Event Listeners 
****************/
// Creat an event listener for the bottom
// Setup filter button for date and city
button.on('click', () => {
    
    // Prevent the page from refreshing on events
    d3.event.preventDefault();

    let inputDate = inputFieldDate.property('value').trim(); // trim like excel emoves whitespace from both sides of a string
    // console.log(inputDate);

    let inputCity = inputFieldCity.property('value').toLowerCase().trim();
    // console.log(inputCity);

    let inputState = inputFieldState.property('value').toLowerCase().trim();
    // console.log(inputState);

    let filterDate = tableData.filter(tableData => tableData.datetime == inputDate);
    // console.log(filterDate);

    let filterCity = tableData.filter(tableData => tableData.city === inputCity);
    // console.log(filterCity);

    let filterState = tableData.filter(tableData => tableData.state === inputState);
    console.log(filterState);

    let filterCombinedData = tableData.filter(tableData => tableData.datetime === inputDate && tableData.city === inputCity && tableData.state === inputState);
    // console.log(filterCombinedData);

    tbody.html("");

    let response = {
        filterDate, filterCity, filterState, filterCombinedData
    }
    if(response.filterCombinedData.length !== 0) {
    addData(filterCombinedData);
    }
    else if(response.filterCombinedData.length === 0 && ((response.filterDate.length !== 0 || response.filterCity.length !== 0 || response.filterState.length !== 0))) {
    addData(filterDate) || addData(filterCity) || addData(filterState);
    }
    // If no sightings add comment
    else {
    tbody.append('tr').append('td').text('No sightings on this date, try a new one...');
    }
})
