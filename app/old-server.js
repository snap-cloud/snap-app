// Create a node-static server for serving snap resources the same way
// they are on the web
// TODO: Perhaps we should just override this with a file that uses `fs`?
var snapServer = new staticServer.Server('.');

var getPort = () => parseInt(Math.random()*65536);

var PORT;
var server = http.createServer(function(request, response) {
    request.addListener('end', function() {
        // Serve files!
        snapServer.serve(request, response);
    }).resume();
});

// Make sure that the
function startStaticServer() {
    PORT = getPort();
    try {
        server.listen(PORT);
    } catch (e) {
        startStaticServer();
    }
}

startStaticServer();

// mailWindow init
