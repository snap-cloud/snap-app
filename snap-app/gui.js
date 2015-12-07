IDE_Morph.prototype.originalSaveFileAs = IDE_Morph.prototype.saveFileAs;
IDE_Morph.prototype.saveFileAs = function (
    contents,
    fileType,
    fileName,
    newWindow
) {
    
    var blobIsSupported = false,
        world = this.world(),
        fileExt,
        dataURI, dialog;

    // fileType is a <kind>/<ext>;<charset> format.
    fileExt = fileType.split('/')[1].split(';')[0];
    // handle text/plain as a .txt file
    fileExt = '.' + (fileExt === 'plain' ? 'txt' : fileExt);

    // This is a workaround for a known Chrome crash with large URLs
    function exhibitsChomeBug(contents) {
        var MAX_LENGTH = 2e6,
        isChrome  = navigator.userAgent.indexOf('Chrome') !== -1;
        return isChrome && contents.length > MAX_LENGTH;
    }

    //saveFile(fileName, fileContents);
    var fs = require('fs');
    var dialog = require('electron').dialog;
    if (fileExt === '.png') {
        nativeImage = require('electron').nativeImage
        img = nativeImage.createFromDataURL(contents);
        contents = img.toPng();
    }
    // save As Stuff
    // TODO: Show a dialog, but that doesn't work?
    // TODO: What to do about encoding?
    
    fs.writeFile(fileName + fileExt, contents, function (err, resp) {
        if (err) {
            console.log('Error! ', err);
            world.showMessage('Oh Noes!' + err);
        } else {
            console.log('Saved??');
            world.showMessage('Saved!');
        }
    });
    
      // dialog.showSaveDialog({ filters: [
      //    { name: 'text', extensions: ['txt'] }
      //   ]}, function (fileName) {
      //   if (fileName === undefined) return;
      //   fs.writeFile(fileName, fContents, function (err) {
      //    dialog.showMessageBox({ message: "The file has been saved! :-)",
      //     buttons: ["OK"] });
      //   });
      // });

}