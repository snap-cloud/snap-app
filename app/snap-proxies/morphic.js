WorldMorph.prototype.originalInitEventListeners =
    WorldMorph.prototype.initEventListeners;

WorldMorph.prototype.initEventListeners = function () {
    this.originalInitEventListeners();

    window.onbeforeunload = function(evt) {
        // TODO: Use native electron APIs.
        console.log('Closing Snap!.');

        // Unlike usual browsers that a message box will be prompted to users, returning
        // a non-void value will silently cancel the close.
        // It is recommended to use the dialog API to let the user confirm closing the
        // application.
        e.returnValue = true;
    }
}