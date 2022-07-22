module.exports = function(RED) {
    "use strict";
    var { uIOhook } = require('uiohook-napi');
    
    function KeyPressNode(config) {
        RED.nodes.createNode(this,config);
        this.device = config.device;
        var node = this;

        uIOhook.on('keydown', (e) => {
            node.send({
                payload: e.keycode
            });
        });
    }

    RED.nodes.registerType("key-press", KeyPressNode);
}