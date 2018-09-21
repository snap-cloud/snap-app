//
const fs = require('fs');
const path = require('path');
const url = require('url');

const {
  remote,
  nativeImage
} = require('electron');

const {
  dialog,
  BrowserWindow
} = remote;

console.log('IS THIS EVEN RUNNING');
alert('hi')


window.saveLocalFile = (filename, extenstion, contents, callback) => {
  // TODO: Need to handle audio
  if (fileExt === '.png') {
    img = nativeImage.createFromDataURL(contents);
    contents = img.toPNG();
  }

  dialogOpts = {
    defaultPath: `${fileName}.${extension}`,
    filters: [{
      name: 'text',
      extensions: [extension]
    }]
  };
  dialog.showSaveDialog(
    BrowserWindow.getFocusedWindow(),
    dialogOpts,
    (filename) => {
      fs.writeFile(filename, contents, callback);
    }
  );
};

window.getLocalFile = (localPath) => {
  let filePath = path.join(__dirname, resourcePath);
  return fs.readFileSync(filePath).toString();
}
