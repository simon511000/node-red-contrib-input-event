module.exports = function(RED) {
    "use strict";
    var InputEvent = require('input-event');
    var fs = require('fs');
    
    function KeyPressNode(config) {
        RED.nodes.createNode(this,config);
        this.device = config.device;
        var node = this;

        fs.readdir('/dev/input/by-path/', (err, files) => {
            // Keep only keyboards
            var keyboards = files.filter((file) => file.includes('kbd'));
        
            if(keyboards.length > 0) {
                var keyboard = keyboards[0];
        
                var input = new InputEvent('/dev/input/by-path/' + keyboard);
                var keyboard = new InputEvent.Keyboard(input);
                keyboard.on('keypress', function(event) {
                    node.send({
                        payload: event.code
                    });
                });
            }
        });
    }

    RED.nodes.registerType("key-press", KeyPressNode);
}