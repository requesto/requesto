// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const Axios = require('axios');
const $ = require("jquery");
const {
    ipcMain
} = require('electron');

console.log(ipcMain);


$(".bar .input-button").click(function() {

    const action = $(".bar .input-action").val();
    const url = $(".bar .input-url").val();

    $(".result").html("Carregando....");
    console.log("Carregando...");

    Axios({
        method: action,
        url: url
    }).then(function(response) {
        $(".result").html(JSON.stringify(response));
    })
    .catch(function(error) {
        $(".result").html(JSON.stringify(error));
    });
})
