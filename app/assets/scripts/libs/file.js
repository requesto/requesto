import {initialSetup} from "./setup";

const fs = window.require("fs");
const mkdirp = window.require("mkdirp");

export default class File {

    constructor() {
        this.setupFileName = "requesto.json";
        this.setupFilePath = `/Users/${window.process.env.USER}/.requesto/`;
        this.setupFileURL = `${this.setupFilePath}${this.setupFileName}`
        this.initialSetup = initialSetup;
        this.createSetupFolder = this.createSetupFolder.bind(this);
        this.createSetupFile = this.createSetupFile.bind(this);
        this.loadSetupFile = this.loadSetupFile.bind(this);
    }

    createSetupFolder(callback){
        mkdirp(this.setupFilePath, function (err) {
            console.log("createSetupFolder: ","An error ocurred creating the file " + err);
            return callback();
        });
    }

    createSetupFile(callback) {
        const initialSetup = this.initialSetup;
        const setupFileURL = this.setupFileURL;

        this.createSetupFolder(function(){
            fs.writeFile(setupFileURL,JSON.stringify(initialSetup), function(err) {
                if (err) {
                    console.log("createSetupFile: ","An error ocurred creating the file " + err);
                    return;
                }
                callback(initialSetup);
                console.log("createSetupFile: ","The file has been succesfully saved");
            });
        })
    }

    loadSetupFile(callback) {
        const createSetupFile = this.createSetupFile;
        fs.readFile(this.setupFileURL, 'utf-8', function(err, data) {
            if (err) {
                console.log("loadSetupFile: ",err.message);
                // alert("An error ocurred reading the file :" + err.message);
                createSetupFile(callback);
                return;
            }
            // Change how to handle the file content
            console.log("loadSetupFile: ","The file content is : " + data);
            // alert("The file has been read succesfully");

            callback(JSON.parse(data));
        })
    }

    updateSetupFile(content) {
        const setupFileURL = this.setupFileURL;

        this.createSetupFolder(function(){
            fs.writeFile(setupFileURL,JSON.stringify(content), function(err) {
                if (err) {
                    console.log("updateSetupFile: ","An error ocurred creating the file " + err);
                    return;
                }
                console.log("updateSetupFile: ","The file has been succesfully updated");
            });
        })
    }
}
