// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let Axios = require('axios');

console.log(Axios);


Axios.get('http://beta.json-generator.com/api/json/get/4JVFHRAHZ')
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });
