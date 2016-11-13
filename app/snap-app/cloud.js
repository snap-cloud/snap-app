// Overrides for cloud.js
// This mainly uses a local endpoint.

var SnapCloud = new Cloud(
    'https://snap.apps.miosoft.com/SnapCloudLocal'
);


// Overrides
Cloud.prototype.getPublicProject = function (
    id,
    callBack,
    errorCall
) {
    // id is Username=username&projectName=projectname,
    // where the values are url-component encoded
    // callBack is a single argument function, errorCall take two args
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        request.open(
            "GET",
            (this.hasProtocol() ? '' : 'http://')
                + this.url + '' // snap-app
                + '?'
                + id,
            true
        );
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.responseText.indexOf('ERROR') === 0) {
                        errorCall.call(
                            this,
                            request.responseText
                        );
                    } else {
                        callBack.call(
                            null,
                            request.responseText
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url + '', // snap-app
                        localize('could not connect to:')
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};