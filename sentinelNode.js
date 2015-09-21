var Node = require("./node");
var inherit = require("./inherit");

var SentinelNode = function (position) {
	var FIRST = "first";
	var LAST = "last";

	Node.call(this, null);
	
	this.insertBefore = function (node) {
		if (position == FIRST) {
			throw new Error("Cannot insert before the last sentinel");
		}

		Node.prototype.insertBefore.call(this, node);
	};

	this.insertAfter = function (node) {
		if (position == LAST) {
			throw new Error("Cannot insert after the last setinel");
		}
		Node.prototype.insertAfter.call(this, node);
	};
	
	this.getValue = function () {
		throw new Error("cannot get value for " + position +" sentinel");
	};

	this.remove = function () {
		throw new Error("cannot remove the " + position + " sentinel");
	};
};

inherit(Node, SentinelNode);
module.exports = SentinelNode;


