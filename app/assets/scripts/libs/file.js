import {initialSetup} from "./setup";

const fs = window.require("fs");
const mkdirp = window.require("mkdirp");
const dialog = window.require('electron').remote.dialog;

export default class File {

    constructor() {
        this.setupFileName = "requesto.json";
        this.setupFilePath = `/Users/${window.process.env.USER}/.requesto/`;
        this.setupFileURL = `${this.setupFilePath}${this.setupFileName}`
        this.initialSetup = initialSetup;
        this.createSetupFolder = this.createSetupFolder.bind(this);
        this.createSetupFile = this.createSetupFile.bind(this);
        this.loadSetupFile = this.loadSetupFile.bind(this);
        this.exportSetup = this.exportSetup.bind(this);
    }

    createSetupFolder(callback) {
        mkdirp(this.setupFilePath, (err) => {
            console.log("createSetupFolder: ", "An error ocurred creating the file " + err);
            return callback();
        });
    }

    createSetupFile(callback) {
        this.createSetupFolder(() => {
            fs.writeFile(this.setupFileURL, JSON.stringify(this.initialSetup), (err) => {
                if (err) {
                    console.log("createSetupFile: ", "An error ocurred creating the file " + err);
                    return;
                }
                this.callback(this.initialSetup);
                console.log("createSetupFile: ", "The file has been succesfully saved");
            });
        })
    }

    loadSetupFile(callback) {
        fs.readFile(this.setupFileURL, 'utf-8', (err, data) => {
            if (err) {
                console.log("loadSetupFile: ", err.message);
                // alert("An error ocurred reading the file :" + err.message);
                this.createSetupFile(callback);
                return;
            }
            // Change how to handle the file content
            //data
            console.log("loadSetupFile: ", "The file has been succesfully loaded");
            callback(JSON.parse(data));
        })
    }

    updateSetupFile(content) {
        this.createSetupFolder(() => {
            fs.writeFile(this.setupFileURL, JSON.stringify(content), (err) => {
                if (err) {
                    console.log("updateSetupFile: ", "An error ocurred creating the file " + err);
                    return;
                }
                console.log("updateSetupFile: ", "The file has been succesfully updated");
            });
        })
    }

    exportSetup(){
        console.log("EXPORTANDO.....");
        console.log(dialog);
        dialog.showSaveDialog({
                title: "Requesto",
                defaultPath: this.setupFileURL
            }, (result) => {
                fs.readFile(this.setupFileURL, 'utf-8', (err, data) => {
                    fs.writeFile(result, data, (err) => {
                        if (err) {
                            console.log("exportSetup: ", "An error ocurred creating the file " + err);
                            return;
                        }
                        console.log("exportSetup: ", "The file has been succesfully saved");
                })
            });
        });
    }
}
