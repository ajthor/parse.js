var _ = require("lodash");
var node = require("./node.js");

var layer = module.exports = function() {
	if(!(this instanceof layer)) return new layer();
	this._nodes = [];
};

_.extend(layer.prototype, {

	parse: function(input) {
		try {
			var n, result = 0;
			// Get first element.
			var working = input.shift();
			for(var i = 0, len = this._nodes.length; i < len; i++) {
				result += this._nodes[i].parse(working, input);
			}
			// If no node matches this, create a new node.
			if(result === 0) {
				n = new node(working);
				this._nodes.push(n);
				result = n.parse(working, input);
			}
			
		} catch(e) {
			console.log("Error:", e);
			console.log("Stack trace:", e.stack);
		} finally {
			return result;
		}
		
	}

});



