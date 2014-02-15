var _ = require("lodash");

//
//
//

var node = function(comparator) {
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

//
//
//

var layer = function() {
	this._nodes = [];
};

_.extend(layer.prototype, {

	parse: function(input) {
		var result = 0;
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

		return result;
	}

});

//
//
//

var network = module.exports = function() {
	this._layer = new layer();
};

_.extend(network.prototype, {

	parse: function(input) {
		var result;
		// Force array type and pass element to first layer.
		if(typeof input === 'string') input = input.split('');
		else if(!Array.isArray(input)) input = [input];
		result = this._layer.parse(input);

		console.log(result);
	}

});

