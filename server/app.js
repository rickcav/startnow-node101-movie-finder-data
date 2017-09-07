const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const url = 'http://www.omdbapi.com/?apikey=8730e0e&';
const encode = encodeURIComponent;
// use without index file redundent code 
// const port = process.env.port || 3000;
const app = express();
let cache = {};

app.use(morgan('dev'));
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
// GET request for remote image     
// app.use('/', function(req, res, next) {
// })

app.get('/', function(req, res) {
    let param = '';
    let key = '';


    if (req.query.hasOwnProperty('i')) {
        key = req.query.i;
        param = 'i=' + encode(key);
    } else if (req.query.hasOwnProperty('t')) {
        key = req.query.t;
        param = 't=' + encode(key);
    }
    if (cache.hasOwnProperty(key)) {
        res.json(cache[key]);
    } else {
        console.log(url + param);
        axios.get(url + param)
            .then(function(response) {
                cache[key] = response.data;
                res.json(cache[key]);
            });
    };
});
app.get('/data', function(req, res) {
    res.json(cache);
    //         end();
    // })
})

// to use the port info from the const area and not the index.js
// app.listen(port);

module.exports = app;


// In this project we're going to:
//   - Create a server using the `Express` framework
//   - Log all incoming requests with the `morgan` logging library
//   - Accept requests for the Open Movie DataBase (OMDB) API
//   - Make the requests to the OMDB using the `axios` library
//   - Cache, or store, the responses for subsequent requests
//   - Ensure the data is updated at least once a day

// ## Exit Criteria

//  * Server should log each request using `morgan`'s dev format

//  * Server should indicate when it is listening and on which port

//  * Server should respond to GET requests to `/?i=tt3896198``/?i=tt3896198` with movie data

//  * Server should respond to GET requests to `/?i=tt3896198` with movie data without fetching from the OMDb api

//  * All tests should pass