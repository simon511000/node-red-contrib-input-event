module.exports = function(RED) {
    "use strict";
    require('input-event');
    
    function KeyPressNode(config) {
        RED.nodes.createNode(this,config);
        this.device = config.device;
        var node = this;
        node.on('input', function(msg) {
            var input = new InputEvent(node.device);
            var keyboard = new InputEvent.Keyboard(input);
            keyboard.on('keypress', function(event) {
                node.send({
                    payload: event.code
                });
            });
        });
    }

    RED.nodes.registerType("key-press", KeyPressNode);
}