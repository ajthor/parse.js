var _ = require("lodash");

var network = module.exports = function(nodes) {
	if(!(this instanceof network)) return new network(nodes);
	this.nodes = [];
	if(nodes) {
		if(!Array.isArray(nodes)) nodes = [nodes];
		nodes.forEach(function(node) {
			this.nodes.push(node);
		}, this);
	}
};

_.extend(network.prototype, {

	heuristicSplit: function(input) {
		this.nodes.forEach(function(node) {
			if(node.compare(input)) {
				
			}
		});
	},

	parse: function(input) {
		// Convert input to workable array.
		if(!Array.isArray(input)) input = [input];
		console.log("input:", input);
		// var working = [];
		// for(var i = 0, len = input.length; i < len; i++) {
		// 	working[i] = input.charCodeAt(i);
		// }

	}

});