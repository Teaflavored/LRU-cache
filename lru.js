var LinkedList = require("./linkedList");

var LRU = function (maxSize, options) {
	if (typeof options == "undefined" ) {
		options = {};
	}

	this.list = new LinkedList({
		dontPrintList: options.dontPrintList
	});		
	this.hashMap = {};
	this.maxSize = maxSize;
	this.currentSize = 0;
	this.hits = 0;
	this.misses = 0;
	this.removes = 0;

	this.get = function (key, fn) {
		var node = this.hashMap[key];
		if (node){
			//move it to the front of the list	
			this.hits += 1;
			node.remove();
			this.list.unshift(node);
			return node.getValue();
		} 
			// key doesn't exist in hash map need to add it, check if we need to remove the last one to create space
		this.misses += 1;

		var value = fn();
		var newNode = this.list.unshift(value, key);
		this.hashMap[key] = newNode;
		this.currentSize += 1;

		if (this.currentSize > this.maxSize) {
			this.removes++;
			var removedNode = this.list.pop();
			delete this.hashMap[removedNode.getKey()];
			this.currentSize -= 1;
		}
		
		return newNode.getValue();
	};

	this.printStats = function () {	
		console.log("There were " + this.hits + " number of hits on the cache");
		console.log("There were " + this.misses + " number of misses on the cache");
		console.log("There were " + this.removes + " number of removes performed on the cache");
	};
};


module.exports = LRU;
