import {initialStorage} from "./../data/initialStorage";
import guid from "./guid";

const fs = window.require("fs");
const mkdirp = window.require("mkdirp");
const dialog = window.require('electron').remote.dialog;

export default class File {

    constructor() {
        this.storageFileName = "requesto.json";
        this.storageFilePath = `/Users/${window.process.env.USER}/.requesto/`;
        this.storageFileURL = `${this.storageFilePath}${this.storageFileName}`
        this.initialStorage = initialStorage;
        this.checkStorageHealth = this.checkStorageHealth.bind(this);
        this.createStorageFolder = this.createStorageFolder.bind(this);
        this.createStorageFile = this.createStorageFile.bind(this);
        this.loadStorageFile = this.loadStorageFile.bind(this);
        this.exportStorage = this.exportStorage.bind(this);

    }

    checkStorageHealth(data){
        var storage = JSON.parse(data);
        storage.folders.map(folder => {
            folder.id = guid();
            folder.items.map(request => {
                request.id = guid();
                if (!("headers" in request)) request.headers = {}
                if (!("params" in request)) request.params = {}
                if (!("body" in request)) request.body = {}
                return request;
            })
            return folder;
        })

        return storage;
    }

    createStorageFolder(callback) {
        mkdirp(this.storageFilePath, (err) => {
            if (err) {
                console.log("createStorageFolder: ", "An error ocurred creating the folder " + err);
                return;
            }
            console.log("createStorageFolder: ", "The folder has been succesfully created");
            return callback();
        });
    }

    createStorageFile(callback) {
        let initialStorage = JSON.stringify(this.initialStorage);
        this.createStorageFolder(() => {
            fs.writeFile(this.storageFileURL, initialStorage, (err) => {
                if (err) {
                    console.log("createStorageFile: ", "An error ocurred creating the file " + err);
                    return;
                }

                console.log("createStorageFile: ", "The file has been succesfully saved");

                var checkedData = this.checkStorageHealth(initialStorage);
                window.requesto = checkedData;
                callback(checkedData);
            });
        })
    }

    loadStorageFile(callback) {
        fs.readFile(this.storageFileURL, 'utf-8', (err, data) => {
            if (err) {
                console.log("loadStorageFile: ", err.message);
                // alert("An error ocurred reading the storage file :" + err.message);
                this.createStorageFile(callback);
                return;
            }

            console.log("loadStorageFile: ", "The file has been succesfully loaded");

            var checkedData = this.checkStorageHealth(data);
            window.requesto = checkedData;
            this.updateStorageFile(checkedData);
            callback(checkedData);
        })
    }

    updateStorageFile(content) {
        this.createStorageFolder(() => {
            fs.writeFile(this.storageFileURL, JSON.stringify(content), (err) => {
                if (err) {
                    console.log("updateStorageFile: ", "An error ocurred creating the file " + err);
                    return;
                }
                console.log("updateStorageFile: ", "The file has been succesfully updated");
            });
        })
    }

    exportStorage(){
        console.log("EXPORTANDO.....");
        console.log(dialog);
        dialog.showSaveDialog({
                title: "Requesto",
                defaultPath: this.storageFileURL
            }, (result) => {
                fs.readFile(this.storageFileURL, 'utf-8', (err, data) => {
                    fs.writeFile(result, data, (err) => {
                        if (err) {
                            console.log("exportStorage: ", "An error ocurred creating the file " + err);
                            return;
                        }
                        console.log("exportStorage: ", "The file has been succesfully saved");
                })
            });
        });
    }
}
