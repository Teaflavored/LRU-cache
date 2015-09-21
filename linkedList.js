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

	this.print = function () {
		printList.call(this);
	};

	this.push = function (valueOrNode, key) {
		var pushedNode;

		if (typeof valueOrNode == "object") {
			pushedNode = valueOrNode;
			!options.dontPrintList && console.log("pushing " + valueOrNode.getValue() + " onto list.");
			this.end.insertBefore(valueOrNode);	
		} else {
			!options.dontPrintList && console.log("pushing " + valueOrNode + " onto list.");
			pushedNode = new Node(valueOrNode, key);
			this.end.insertBefore(pushedNode);
		}

		this.length += 1;
		printList.call(this);

		return pushedNode;
	};

	this.pop = function () {
		var removedNode = this.end.prev.remove();	
		this.length -= 1;

		!options.dontPrintList && console.log("popping " + removedNode.getValue() + " from the list.");
		printList.call(this);
		return removedNode;
	};

	this.unshift = function (valueOrNode, key) {
		var unshiftedNode;

		if (typeof valueOrNode == "object") {
			unshiftedNode = valueOrNode;
			!options.dontPrintList && console.log("unshifting " + valueOrNode.getValue() + " to the list.");
			this.start.insertAfter(valueOrNode);	
		} else {
			unshiftedNode = new Node(valueOrNode, key);
			!options.dontPrintList && console.log("unshifting " + valueOrNode + " to the list.");
			this.start.insertAfter(unshiftedNode);
		}
		this.length += 1;

		return unshiftedNode; 
	};

	this.shift = function () {
		var removedNode = this.start.next.remove();	
		this.length -= 1;

		!options.dontPrintList && console.log("shifting " + removedNode.getValue() + " from the list.");
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
