module.exports = function(RED) {
    "use strict";
    var InputEvent = require('input-event');
    var { exec } = require('child_process')
    
    function KeyPressNode(config) {
        RED.nodes.createNode(this,config);
        this.device = config.device;
        var node = this;

        // Get keyboard device
        exec("ls /dev/input/by-path/ | grep -m 1 'kbd'", function(error, stdout, stderr) {
            var device = "/dev/input/by-path/" + stdout.split('\n')[0];

            var input = new InputEvent(device);
            var keyboard = new InputEvent.Keyboard(input);
            keyboard.on('keypress', function(event) {
                node.send({
                    payload: event.code
                });
            });
        })
    }

    RED.nodes.registerType("key-press", KeyPressNode);
}