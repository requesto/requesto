const Electron = require('electron');
const App = Electron.app;
const BrowserWindow = Electron.BrowserWindow;
const NativeImage = Electron.nativeImage;
const Menu = require('./electron/menu');

App.setName("Requesto");

if (App.dock) {
    App.dock.setIcon(NativeImage.createFromPath("resources/icon.png"));
    // App.dock.setBadge("1");
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        show: true,
        backgroundColor: '#21252b',
        title: "Requesto",
        center: true
    })

    //mainWindow.webContents.openDevTools()
    mainWindow.maximize()
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`)
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your App supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    // Showing window gracefully
    // mainWindow.once('ready-to-show', () => {
    //   mainWindow.show()
    // })

    Menu.buildMenu()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
App.on('ready', createWindow)

// Quit when all windows are closed.
App.on('window-all-closed', function() {
    // On OS X it is common for Applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        App.quit()
    }
})

App.on('activate', function() {
    // On OS X it's common to re-create a window in the App when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your App's specific main process
// code. You can also put them in separate files and require them here.
