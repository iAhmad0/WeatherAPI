/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '&APPID=d0d22712929084c7bd8c0d2b3a61a127&units=imperial';

// The URL of the API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='

// Selectors
const zipCode =  document.getElementById('zip');
const feelings =  document.getElementById('feelings');

// Object to hold the returned data from the API
userData = {};

// Create a new date instance dynamically with JS
let d = new Date();
// January = 0, so we're adding 1
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();

/* End of Global Variables */

/* Functions */

// GET and POST whenever the 'Generate' button is clicked
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){  
  // Get data from API
  getWeather(baseURL, zipCode.value, apiKey)

  // Send data to server
  .then(()=> {
    postData('/all', {user: {zipCode: zipCode.value, feelings: feelings.value}, api: userData});
  })

  // Get data from server to dynamically add it to UI
  .then(()=> {
    getData('/all');
  })
}

// Function to get data from API
const getWeather = async (baseURL, zipCode, key)=>{
  
  const res = await fetch(baseURL+zipCode+key);

  try {
    const data = await res.json();
    console.log(data);
    // Store the API response, in order to be sent to the server
    userData = data;
    
  }  catch(error) {
    // appropriately handle the error
    console.log("error", error);
  }
}

// Function to send data to server
const postData = async ( url = '', data = {})=>{
  
  const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData
  }catch(error) {
  console.log("error", error);
  // appropriately handle the error
  }
}

// Function to get data from server
const getData = async ( url = '')=>{
  
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    });

  try {
    const newData = await response.json();
    console.log(newData);
    // Update the UI dynamically
    document.getElementById("date").innerHTML = newDate;
    document.getElementById('temp').innerHTML = Math.round(newData["api"]["main"].temp)+ ' degrees';
    document.getElementById('content').innerHTML = newData["api"]["main"].feels_like;

  }catch(error) {
  console.log("error", error);
  // appropriately handle the error
  }
}