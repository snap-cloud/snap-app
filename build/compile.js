var packager = require('electron-packager');

var buildSettings = {
    dir: '.',
    name: 'Snap!',
    platform: 'darwin', // TODO: Change this later.
    arch: 'all',
    version: '0.35.4',
    out: 'binaries/',
    ignore: [
        'build',
        'binaries',
        '.*',
        '*.md'
    ],
    // 'app-version': String
    // asar: Boolean
    // 'asar-unpack': String
    // 'asar-unpack-dir': String
};


packager(buildSettings, function done(err, appPath) {
    console.log('Done writing packages.');
    if (err) {err
        console.log('Errors Occurred: ', err);
    }
});
