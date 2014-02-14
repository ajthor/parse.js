var _ = require("lodash");
// var node = require("./node.js");
var layer = require("./layer.js");

var network = module.exports = function(f, options) {
	if(!(this instanceof network)) return new network(f);
	this.options = _.defaults((options || {}), {
		iterations: 200
	});

	this._f = f;
	this.working = null;
	// Create layer 1
	this._layers = [];
	this._layers.push(new layer());
};

_.extend(network.prototype, {

	parse: function(input) {
		try {
			if(!Array.isArray(input)) input = [input];
			this._raw = input;
			// process input using supplied initialization function,
			// or just set to the input of the parse function.
			this.working = (this._f) ? this._f(input) : input;

			input.forEach(function(item) {
				console.log("Parsing {", item, "} ...");
				var result = [];

				for(var i = 0, len = item.length; i < len; i++) {
					// If no layer exists at level i, create one.
					if(!this._layers[i]) {
						// Create new layer.
						this._layers.push(new layer());
					}
					// Parse input.
					result.push(this._layers[i].parse(item[i]));

				}

				// Result is equal to the # of matches over the length. 
				// Gives percentage of correct matches.
				// result = result/this.working.length;

				console.log(result, "percent match.");

			}, this);


		} catch(e) {
			console.log("ERROR:", e);
		}
	}

});