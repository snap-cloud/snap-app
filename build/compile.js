var packager = require('electron-packager');
packager({
    dir: '.',
    name: 'Snap!',
    platform: 'all',
    arch: 'all',
    version: '0.35.4',
    out: 'binaries/',
    ignore: 'build/'
    // 'app-version': String
    // asar: Boolean
    // 'asar-unpack': String
    // 'asar-unpack-dir': String
}, function done(err, appPath) {
    console.log('Done writing packages.');
    if (err) {err
        console.log('Errors Occurred: ', err);
    }
});