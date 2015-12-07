IDE_Morph.prototype.originalSaveFileAs = IDE_Morph.prototype.saveFileAs;
IDE_Morph.prototype.saveFileAs = function (
    contents,
    fileType,
    fileName,
    newWindow
) {
    //saveFile(fileName, fileContents);
    var fs = require('fs');
    var dialog = require('electron').dialog;
    // save As Stuff
    
    fs.writeFile(fileName, contents);
    console.log('Saved??');
    
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