var _ = require("lodash");
var ann = require("./util/ann/ann.js");

var pattern = exports.pattern = function(rx, cb) {
	if(!rx) return void 0;
	var result = [];
	this.working.forEach(function(item) {
		var matches = item.match(rx);
		for(var i in matches) {
			if(cb) cb(matches[i]);
			result.push(matches[i]);
		}
	});
	this.working = result;
	return this._make(result);
};

var sentences = exports.sentences = function() {

	var network = new ann(function(input) {
		// Split input into charaters.
		// if(typeof input !== "string") return;
		var result = [];
		for(var i = 0, len = input.length; i < len; i++) {
			result[i] = input.charCodeAt(i);
		}
		
		return result;

	});

	network.parse(this.working);

};

var words = exports.words = function(cb) {
	var exp = rx().word();///\b\S+\b/g;
	return this.pattern(exp.generate("g"), cb);
};

var morphemes = exports.morphemes = function() {

	var network = new ann(function(input) {
		
		return;

	});

	network.parse(this.working);

};
