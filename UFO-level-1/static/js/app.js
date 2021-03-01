// from data.js
let tableData = data;

// Viewing the available data from the data.js
console.log(tableData);

// Creating references to tbody, input and bottom
let tbody = d3.select('tbody');
let button = d3.select('#filter-btn');
let inputFieldDate = d3.select('#datetime');
let inputFieldCity = d3.select('#city');
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
    
    let inputDate = inputFieldDate.property('value').trim(); // trim like excel removes whitespace from both sides of a string
    // console.log(inputDate);

    let filterDate = tableData.filter(tableData => tableData.datetime == inputDate);
    // console.log(filterDate);
    
    tbody.html('');

    let response = {
        filterDate
    }

    if (response.filterDate.length !== 0) {
        addData(filterDate);
    }
    
    // If no sightings add comment
    else {
        tbody.append('tr').append('td').text('No sightings on this date, try a new one...');
    }
})