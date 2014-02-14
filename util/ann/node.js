var _ = require("lodash");

var node = module.exports = function(comparator) {
	this.comparator = comparator;
};

_.extend(node.prototype, {

	parse: function(input) {
		try {
			// Strict equality comparison.
			// If it is a function, run it through the function and return the result.
			if(!!(this.comparator && this.comparator.constructor && this.comparator.call && this.comparator.apply)) {
				return !!this.comparator(input);
			}
			// Otherwise, strict equality comparison.
			return !!(this.comparator === input);
		} catch(e) {
			console.log("Error:", e);
		}
	}

});