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

defineProxy(
  'saveFileAs',
  function(contents, fileType, fileName, newWindow) {
    let fileExtenstion;
    // fileType is a <kind>/<ext>;<charset> format.
    fileExtenstion = fileType.split('/')[1].split(';')[0];
    // handle text/plain as a .txt file
    fileExtenstion = (fileExtenstion === 'plain' ? 'txt' : fileExtenstion);

    window.saveLocalFile(fileName, fileExtenstion, contents, (err, resp) => {
      if (err) {
        console.log('Error! ', err);
        myself.showMessage('Oh Noes!' + err);
      } else {
        console.log('Saved??');
        myself.showMessage('Saved!');
      }
    });
  }
);

// Override paths because snap content lives in snap/*
// Our snap is served from /snap.html
defineProxy('resourceURL', function() {
  var args = Array.prototype.slice.call(arguments, 0);
  return 'snap/' + args.join('/');
});


defineProxy('getURL', function(resourcePath, callback) {
  if (resourcePath.indexOf('http') === 0) {
    return originalMethod('getURL')(resourcePath, callback);
  }
  return callback(window.getLocalFile(resourcePath));
});
