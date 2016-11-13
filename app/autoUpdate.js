const {app, autoUpdater} = require('electron');
const os = require('os');

var platform = os.platform() + '_' + os.arch();
var version = app.getVersion();

const SERVER = 'https://snap-updater.herokuapp.com';

console.log('CALLED')
console.log(`PLATFORM ${platform}`);
console.log(`VERSION ${version}`);


// event handling after download new release

const updateMsg = 'The new version has been downloaded. Please restart the application to apply the updates.';

autoUpdater.on('update-downloaded',
        function(event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {

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
            quitAndUpdate();
        });


try { 
    autoUpdater.setFeedURL(`${SERVER}/update/${platform}/${version}`);
    autoUpdater.checkForUpdates();
} catch (e) {
    console.log('Update Error:');
    console.log(e.message);
}
