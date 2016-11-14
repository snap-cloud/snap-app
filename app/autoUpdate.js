const {app, autoUpdater, dialog} = require('electron');
const os = require('os');

var platform = os.platform() + '_' + os.arch();
var version = app.getVersion();

const SERVER = 'https://snap-updater.herokuapp.com';

console.log('CALLED')
console.log(`PLATFORM ${platform}`);
console.log(`VERSION ${version}`);


// event handling after download new release

const updateMsg = 'The new version has been downloaded. Please restart the application to apply the updates.';

function initializeAutoUpdater(mainWindow) {
    autoUpdater.on('update-downloaded', updateFunction(mainWindow));
    autoUpdater.on('error', () => {
        console.log('Auto Update Error');
    });

    autoUpdater.on('checking-for-update', () => {
        console.log('checking for update');
    });

    autoUpdater.on('update-available', () => {
        console.log('there is an update available');
    });

    autoUpdater.on('update-not-available', () => {
        console.log('no update');
    });
}

function updateFunction(mainWindow) {
    return (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
        // confirm install or not to user
        var index = dialog.showMessageBox(mainWindow, {
            type: 'info',
            buttons: ['Restart', 'Later'],
            title: 'Snap! App Update',
            message: updateMsg,
            detail: `${releaseName}\n\n${releaseNotes}`
        });

        if (index === 1) {
            return;
        }

        // restart app, then update will be applied
        autoUpdater.quitAndInstall();
    }
}


module.exports = (mainWindow) => {
    try { 
        initializeAutoUpdater(mainWindow);
        autoUpdater.setFeedURL(`${SERVER}/update/${platform}/${version}`);
        autoUpdater.checkForUpdates();
    } catch (e) {
        console.log('Update Error:');
        console.log(e.message);
    }
}
