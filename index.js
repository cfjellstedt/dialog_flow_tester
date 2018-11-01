'use strict';

const https = require('https');
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

//return res.json({ 'fulfillmentText': text });
return text;
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

function myfunc () {
	return 'hallo';
}




function callThingApi () {
    return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
    //let path = '/channels/594032/feeds.json?results=2';

    // Make the HTTP request to get the weather
    https.get('https://api.thingspeak.com/channels/594032/feeds.json?results=2', (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        let response = JSON.parse(body);
        let last = response['field1'];

        // Create response
        let output = 'test';

        // Resolve the promise with the output text
        console.log(output);
        resolve(output);
      });
      res.on('error', (error) => {
        console.log(`Errorinapi`)
		let output = 'test';
		resolve(output);
        //reject();
      });
    });
  });
}

