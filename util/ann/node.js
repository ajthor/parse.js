var _ = require("lodash");
var layer = require("./layer.js");

var node = module.exports = function(comparator) {
	if(!(this instanceof node)) return new node(comparator);
	this.comparator = comparator;
};

_.extend(node.prototype, {

	parse: function(compare, input) {
		try {
			var result;
			// Compare
			if(!!(this.comparator && this.comparator.constructor && this.comparator.call && this.comparator.apply)) {
				result = !!(this.comparator(compare));
			}
			else {
				result = (this.comparator === compare);
			}
			// If the result is positive, pass input through.
			if(result && (input.length > 0)) {
				this._layer = new layer();
				this._layer.parse(input);
			}
			
		} catch(e) {
			console.log("Error:", e);
			console.log("Stack trace:", e.stack);
		} finally {
			return result;
		}
	}

});