//
const fs = require('fs');
const path = require('path');
const url = require('url');

const {nativeImage, remote} = require('electron');

function defineProxy(cls, functionName, makeFunctionBody) {
    cls.prototype[functionName] = makeFunctionBody(cls.prototype[functionName]);
}

defineProxy(IDE_Morph, 'saveFileAs', () => {
    return function (contents, fileType, fileName, newWindow) {
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
    };
});

// Override paths because snap content lives in snap/*
// Our snap is served from /snap.html
defineProxy(IDE_Morph, 'resourceURL', () => {
    return function () {
        var args = Array.prototype.slice.call(arguments, 0);
        return 'snap/' + args.join('/');
    };
});


defineProxy(IDE_Morph, 'getURL', oldGetURL => {
    return function(resourcePath) {
        if (url.parse(resourcePath).protocol) {
            return oldGetURL(resourcePath);
        }
        let filePath = path.join(__dirname, resourcePath);
        let file = fs.readFileSync(filePath);
        return file.toString();
    };
});

// When Ctrl-Q (or Cmd-Q on a Mac) is pressed, close the window. We have to
// explicitly define this behavior because Snap! captures all keyboard input.
defineProxy(WorldMorph, 'initEventListeners', oldInitEventListeners => {
    return function() {
        oldInitEventListeners.call(this);

        this.worldCanvas.addEventListener('keydown', evt => {
            let pressedQuit = false;
            if (evt.keyCode === 81) {
                if (process.platform === 'darwin' && evt.metaKey) {
                    pressedQuit = true;
                } else if (evt.ctrlKey) {
                    pressedQuit = true;
                }
            }

            if (pressedQuit) {
                remote.getCurrentWindow().close();
            }
        });
    };
});
