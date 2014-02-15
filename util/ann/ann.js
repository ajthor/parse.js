var _ = require("lodash");
// var node = require("./node.js");
var layer = require("./layer.js");

var network = module.exports = function(f, options) {
	if(!(this instanceof network)) return new network(f);
	this.options = _.defaults((options || {}), {
		iterations: 200
	});
	this._layer = new layer();
};

_.extend(network.prototype, {

	parse: function(input) {
		try {
			var result;
			// Force array type and pass element to first layer.
			if(typeof input === 'string') input = input.split('');
			else if(!Array.isArray(input)) input = [input];
			result = this._layer.parse(input);

			console.log(result);

		} catch(e) {
			console.log("ERROR:", e);
			console.log("Stack trace:", e.stack);
		}
	}

});