var _ = require("lodash");
var node = require("./node.js");

var layer = module.exports = function() {
	this._nodes = [];
};

_.extend(layer.prototype, {

	parse: function(input) {
		try {
			for(var i = 0, len = this._nodes.length; i < len; i++) {
				// run input through all nodes.
				if(this._nodes[i].parse(input)) return 1;
			}

			// If no result, no node exists to analyze this item at this layer.
			// Create one for future use.
			this._nodes.push(new node(input));
		} catch(e) {
			console.log("Error:", e);
		}
		return 0;
		
	}

});