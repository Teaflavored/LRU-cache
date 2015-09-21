var Node = require("./node");
var Sentinel = require("./sentinelNode");

var List = function (options) {

	if (!options) {
		options = {};
	}

	this.start = new Sentinel("first");
	this.end = new Sentinel("last");

	this.length = 0;
	this.start.insertAfter(this.end);

	var printList = function () {
		if (options.dontPrintList) {
			return;
		}

		var current = this.start.next;
		var currentListString = "";
		
		while (current != this.end) {
			currentListString += current.getValue() + ",";
			current = current.next;
		}
		var finalString = currentListString.substring(0, currentListString.length -1);

		if (this.length == 0) {
			finalString = "empty";	
		} 

		console.log ("Current list is : " + finalString + "\n");
	};

	this.getLength = function () {
		return this.length;
	}

	this.push = function (value) {
		this.end.insertBefore(new Node(value));
		this.length += 1;

		console.log("pushing " + value + " onto list.");
		printList.call(this);

		return this;
	};

	this.pop = function () {
		var removedNode = this.end.prev.remove();	
		this.length -= 1;

		console.log("popping " + removedNode.getValue() + " from the list.");
		printList.call(this);
		return removedNode;
	};

	this.unshift = function (value) {
		this.start.insertAfter(new Node(value));
		this.length += 1;
		
		console.log("unshifting " + value + " to the list.");
		printList.call(this);

		return this;
	};

	this.shift = function () {
		var removedNode = this.start.next.remove();	
		this.length -= 1;

		console.log("shifting " + removedNode.getValue() + " from the list.");
		printList.call(this);

		return removedNode;
	};
	
	this.getValue = function (idx) {
		if (idx >= this.length || idx < 0 || this.length == 0) {
			return null;
		};

		var currentIndex = 0;	
		var current = this.start.next;

		while (current != this.end) {
			if (currentIndex == idx) {
				return current.getValue();
			}

			currentIndex += 1;
		}
	};
};

module.exports = List;
