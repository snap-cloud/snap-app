//
const fs = require('fs');
const path = require('path');
const url = require('url');

const SNAP_INSTALL = `${__dirname}/snap/`;

const {nativeImage} = require('electron');

// Hold Proxied Functions
// TODO: Consider using ES6 Proxies?
GLOBAL_DEFINITIONS = {};

function originalMethod(functionName) {
    return GLOBAL_DEFINITIONS[functionName];
}

function defineProxy(functionName, functionBody) {
    GLOBAL_DEFINITIONS[functionName] = IDE_Morph.prototype[functionName];
    IDE_Morph.prototype[functionName] = functionBody;
    return functionName;
}

defineProxy('saveFileAs',
            function (contents, fileType, fileName, newWindow) {
    var blobIsSupported = false,
        myself = this,
        fileExt;

    // fileType is a <kind>/<ext>;<charset> format.
    fileExt = fileType.split('/')[1].split(';')[0];
    // handle text/plain as a .txt file
    fileExt = '.' + (fileExt === 'plain' ? 'txt' : fileExt);

    // This is a workaround for a known Chrome crash with large URLs
    // TODO: Verify whether this is necessary in Electron
    function exhibitsChomeBug(contents) {
        var MAX_LENGTH = 2e6,
        isChrome  = navigator.userAgent.indexOf('Chrome') !== -1;
        return isChrome && contents.length > MAX_LENGTH;
    }

    // saveFile(fileName, fileContents);

    // Convert images to node Buffers
    // TODO: Handle other formats (sound?)
    if (fileExt === '.png') {
        img = nativeImage.createFromDataURL(contents);
        console.log('img:', img);
        debugger;
        contents = img.toPng();
    }
    // save As Stuff
    // TODO: Show a dialog, but that doesn't work?
    // TODO: What to do about encoding?

    fs.writeFile(fileName + fileExt, contents, function (err, resp) {
        if (err) {
            console.log('Error! ', err);
            myself.showMessage('Oh Noes!' + err);
        } else {
            console.log('Saved??');
            myself.showMessage('Saved!');
        }
    });

    // This doesn't work right now, because it's the wrong electron "context"
    // var dialog = require('electron').dialog;
    // dialog.showSaveDialog({ filters: [
    //    { name: 'text', extensions: ['txt'] }
    //   ]}, function (fileName) {
    //   if (fileName === undefined) return;
    //   fs.writeFile(fileName, fContents, function (err) {
    //    dialog.showMessageBox({ message: "The file has been saved! :-)",
    //     buttons: ["OK"] });
    //   });
    // });
})

// Override paths because snap content lives in snap/*
// Our snap is served from /snap.html
defineProxy('resourceURL', function () {
    var args = Array.prototype.slice.call(arguments, 0);
    return 'snap/' + args.join('/');
});


defineProxy('getURL', function(resourcePath, callback) {
    if (url.parse(resourcePath).protocol) {
        return originalMethod('getURL')(resourcePath, callback);
    }
    let filePath = path.join(__dirname, resourcePath);
    let file = fs.readFileSync(filePath);
    return callback(file.toString());
});
