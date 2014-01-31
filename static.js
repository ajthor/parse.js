var _ = require("lodash");
var rx = require("rxjs");

pattern = exports.pattern = function(rx, cb) {
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

sentences = exports.sentences = function(cb) {
	var exp = rx().characters(rx().S()).characters(rx().except("\\.!\\?")).orMore().characters("\\.!\\?\\\"\'").orMore();
	return this.pattern(exp.generate("g"), cb);
};

words = exports.words = function(cb) {
	var exp = rx().word();///\b\S+\b/g;
	return this.pattern(exp.generate("g"), cb);
};

prefixes = exports.prefixes = function(cb) {
	var exp = rx().word().generate("g");
	var result = [];
	this.working.forEach(function(item) {
		var matches = item.match(exp);
		matches.forEach(function(word) {
			for(var i = 0, len = word.length; i < len-1; i++) {
				// Remove last letter.
				word = word.slice(0, -1);
				if(cb) cb(word);
				result.push(word);
			}
		});
	});
	this.working = result;
	return this._make(result);
};

suffixes = exports.suffixes = function(cb) {
	var exp = rx().word().generate("g");
	var result = [];
	this.working.forEach(function(item) {
		var matches = item.match(exp);
		matches.forEach(function(word) {
			for(var i = 0, len = word.length; i < len-1; i++) {
				// Remove last letter.
				word = word.substr(1);
				if(cb) cb(word);
				result.push(word);
			}
		});
	});
	this.working = result;
	return this._make(result);
};

clusters = exports.clusters = function(cb) {
	var exp = rx().word().generate("g");
	var result = [];
	this.working.forEach(function(item) {
		var matches = item.match(exp);
		matches.forEach(function(word) {
			this.suffixes(function(suffix) {
				result.push(suffix);
			});
			this.reset();
			this.prefixes(function(prefix) {
				result.push(prefix);
			});
			this.suffixes(function(suffix) {
				result.push(suffix);
			});

			result.forEach(function(item) {
				if(cb) cb(item);
			});
		}, this);
	}, this);
	this.working = result;
	return this._make(result);
};

unique = exports.unique = function(cb) {
	var words = this.words().working;
	var result = _.uniq(words, function(word) {return word.toLowerCase();});
	result.forEach(function(item) {
		if(cb) cb(item);
	});
	this.working = result;
	return this._make(result);
};

shared = exports.shared = function(cb) {
	var result = [];
	var words = this.previous._raw;
	// Search all items.
	this.unique().working.forEach(function(item) {
		var match = true;
		// Find items that are in every previous array.
		words.forEach(function(word) {
			if(word.toLowerCase().search(item.toLowerCase()) == -1) {
				match = false;
				return false;
			}
		});
		if(match) {
			if(cb) cb(item);
			result.push(item);
		}
	});

	this.working = result;
	return this._make(result);
};

stem = exports.stem = function(cb) {
	var result = "";
	this.working.prefixes().shared(function(item) {
		if(item.length > root.length) {
			result = item;
		}
	});
	// Should be a significant length.
	if(!(result.length > 3)) {
		return null;
	}

	this.working = result;
	return this._make(result);
};

significant = exports.significant = function(cb, modifier, len) {
	if(!modifier) modifier = 2;
	if(!len) len = 1;
	var result = [];
	var matches = [];
	var search = this.working.slice(0);
	var remove;

	this.working.forEach(function(item) {
		remove = _.remove(search, function(term) {
			return !!(term == item);
		});
		if(remove.length > 0) {
			result.push(remove);
		}
	}, this);

	// Calculate standard deviation.
	var deviation = (function() {
		var total = result.length;
		var sum = 0;
		result.forEach(function(item) {
			sum += item.length;
		});
		var mean = sum/total;
		var difference2 = [];
		sum = 0;
		for(var i = 0; i < result.length; i++) {
			difference2[i] = Math.pow(result[i].length-mean,2);
			sum += difference2[i];
		}
		return Math.sqrt(sum/total);
	})();
	// Remove results less than modifier (default: 2) 
	// deviations above the avg.
	result = _.remove(result, function(item) {
		return !!(item.length > deviation*modifier);
	});

	// console.log(result);
	// Get just single items.
	result = _.uniq(_.flatten(result));
	// And remove items not greater than len (default: 1)
	result = _.remove(result, function(item) {
		return !!(item.length >= len);
	});

	// console.log(result);
	result.forEach(function(item) {
		if(cb) cb(item);
	});

	this.working = result;
	return this._make(result);
};




