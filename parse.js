var _ = require("lodash");

var parse = module.exports = function(args) {
	if(!(this instanceof parse)) return new parse(args);
	if(!args) return this;
	
	this._raw = this.working = (Array.isArray(args)) ? args : [args];
};

_.extend(parse.prototype, require("./static.js"));
_.extend(parse.prototype, {

	_raw: [],

	get: function(id) {return this.working;},

	reset: function() {
		if(this.previous) this._raw = this.previous._raw;
		this.working = this._raw;
	},

	contains: function(item) {
		return !!(this.working.indexOf(item) !== -1);
	},

	_make: function(args) {
		var obj = new parse(args);
		obj.previous = this;
		return obj;
	}
	
});

var methods = ['first', 'last', 'rest', 'flatten', 'difference', 
				'intersection', 'indexOf', 'forEach'];

_.each(methods, function(method) {
	parse.prototype[method] = function() {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(this.working);
		return _[method].apply(_, args);
	};
});




