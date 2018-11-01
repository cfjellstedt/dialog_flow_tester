'use strict';

const http = require('http');
const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

const host = 'api.thingspeak.com';

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/webhook", function(req, res) {

	let text = callThingApi();
	
return res.json({ 'fulfillmentText': text });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

function callThingApi () {
    // Create the path for the HTTP request to get the weather
    let path = '/channels/594032/feeds.json?results=2';
	  
    console.log('API Request: ' + host + path);

    // Make the HTTP request to get the weather
    http.get({host: host, path: path}, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        let response = JSON.parse(body);
        let last = response['field1'];
  

        // Create response
        let output = 'testa';

       return output;
}