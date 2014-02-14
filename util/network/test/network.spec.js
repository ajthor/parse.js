describe("network", function() {

	var network;
	var test = "decision decisive indecisive decide decides deciding decided";

	it("should load without throwing", function() {
		expect(function() {
			network = require("../network.js");
		}).not.toThrow();
	});

	it("instantiation should work", function() {

		var t = new network();

		t.parse(["test", "testing", "tester"]);

	});

});