// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of 
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

// GET route with a callback function
app.get('/all', getData);

function getData(req, res) {
  res.send(projectData);
};

// POST route with a callback function
app.post('/all', postData);

function postData (req, res){
  let data = req.body;
  projectData = data;
  console.log(projectData);
};