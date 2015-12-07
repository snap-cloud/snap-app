// Native Modules
var fs = require('fs');
var http = require('http');

// Electrom Modules
// Module to control application life.
var app = require('app'); 
// Module to create native browser window.
var BrowserWindow = require('browser-window');

// Report crashes to the Electron server.
require('crash-reporter').start();

// Custom dependencies
var staticServer = require('node-static');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});


//
// Create a node-static server instance to serve the './public' folder
//
var snapServer = new staticServer.Server('./');
var PORT = 8080;
var server = http.createServer(function (request, response) {
    request.addListener('end', function () {
        // Serve files!
        snapServer.serve(request, response);
    }).resume();
});

// TODO: try-catch loop
server.listen(PORT);

// attempt to disable caching:
app.commandLine.appendSwitch('--disable-http-cache');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    // Create the browser window.
    // TODO: Set automatically.
    mainWindow = new BrowserWindow({width: 1440, height: 900});

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:'+ PORT + '/snap.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();


    // Window settings
    // TODO: these are tests, bbut document
    
    mainWindow.webSecurity = false;
    mainWindow.allowDisplayingInsecureContent = true;
    mainWindow.webaudio = true;
    mainWindow.experimentalFeatures = true;
    mainWindow.experimentalCanvasFeatures = true;

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

});

// save As Stuff
function saveFile (fName, fContents) {
  dialog.showSaveDialog({ filters: [
     { name: 'text', extensions: ['txt'] }
    ]}, function (fileName) {
    if (fileName === undefined) return;
    fs.writeFile(fileName, fContents, function (err) {   
     dialog.showMessageBox({ message: "The file has been saved! :-)",
      buttons: ["OK"] });
    });
  }); 
}
