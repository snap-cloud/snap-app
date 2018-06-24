const ArgumentParser = require('argparse').ArgumentParser;

// Handle Command Line Args
let parser = new ArgumentParser({
    version: '0.0.0', // TODO: pull this from package.json?
    addHelp: true,
    description: 'Customize the desktop Snap! app with these options.',
    epilogue: '',
    debug: true
});

parser.addArgument(
    ['-ag', '--autograder'], {
        nargs: 0,
        type: Boolean,
        defaultValue: '==SUPPRESS==',
        help: 'Pass this flag to enable the autograder to run.'
    }
);

module.exports = parser;
