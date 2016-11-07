// Native Modules
var fs = require('fs');
var http = require('http');

// Electrom Modules
// Module to control application life.
var electron = require('electron');

// Custom dependencies
var staticServer = require('node-static');


var app = electron.app;
// Module to create native browser window.
var BrowserWindow = electron.BrowserWindow;


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

// Create a node-static server for serving snap resources the same way
// they are on the web
// TODO: Perhaps we should just override this with a file that uses `fs`?
var snapServer = new staticServer.Server('.');

var getPort = () => parseInt(Math.random()*65536);

var PORT;
var server = http.createServer(function(request, response) {
    request.addListener('end', function() {
        // Serve files!
        snapServer.serve(request, response);
    }).resume();
});

// Make sure that the 
function startStaticServer() {
    PORT = getPort();
    try {
        server.listen(PORT);
    } catch (e) {
        startStaticServer();
    }
}

startStaticServer();

// attempt to disable caching:
app.commandLine.appendSwitch('disable-http-cache');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    // Create the browser window.
    // TODO: Set automatically.
    // 
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,

        // Security Settings
        allowRunningInsecureContent: false, // TODO
        allowDisplayingInsecureContent: true,
        // Chrome Overrides
        experimentalFeatures: true,
        experimentalCanvasFeatures: true,
        blinkFeatures: '',
        defaultFontFamily: 'sansSerif',
        defaultEncoding: 'UTF-8',
        offscreen: true
    });

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:' + PORT + '/app/snap.html');

    // Open the DevTools.
    // TODO: put behind a dev flag.
    mainWindow.webContents.openDevTools();


    // Window settings
    // TODO: these are tests
    mainWindow.webSecurity = false;

    mainWindow.onbeforeunload = () => {};
    
    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

});

app.on('window-all-closed', () => {
  app.quit()
});


// save As Stuff
function saveFile(fName, fContents) {
    dialog.showSaveDialog({
        filters: [{
            name: 'text',
            extensions: ['txt']
        }]
    }, function(fileName) {
        if (fileName === undefined) {
            return;
        }
        fs.writeFile(fileName, fContents, function(err) {
            dialog.showMessageBox({
                message: "The file has been saved!",
                buttons: ["OK"]
            });
        });
    });
}
