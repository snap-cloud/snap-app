/*
    These are desktop specific add-ons for Snap!
*/

// Return the command line arguments used to launch Snap!
function getCommandLineArgs() {
    var args = process.argv;
    args = args.map(function (item) {
        var named = /--([\w-]+)=(.*)/i,
            match = item.match(named);
        if (match) {
            return new List(match[1], match[2]);
        } else {
            return item;
        }
    });
    return new List(args);
}

function openProject() {
    var args = getCommandLineArgs();
    var fileName;
    args.contents.forEach(function (item) {
        if (item instanceof List)
            if(item.contents[0] == 'open-project') {
                fileName = item.contents[1];
            }
    })
    var fs = require('fs');
    if (fileName) {
        var data = fs.readFileSync(fileName).toString();
        world.children[0].droppedText(data);
    }
}

openProject();
