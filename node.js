var Node = function (value) {
	this.value = value;
	this.next = null;
	this.prev = null;
};

Node.prototype.getValue = function () {
	return this.value;
};

Node.prototype.insertBefore = function (node) {
	if (node.next || node.prev) {
		throw new Error("Node is not detached");
	}	

	node.next = this;
	node.prev = this.prev;
	if (this.prev) {
		this.prev.next = node
	}
	this.prev = node;	
};

Node.prototype.insertAfter= function (node) {
	if (node.prev || node.next) {
		throw new Error("Node is not detached");
	}

	node.next = this.next;
	node.prev = this;
	if (this.next) {
		this.next.prev = node;
	}
	this.next = node;
};

Node.prototype.remove = function () {
	this.prev.next = this.next;
	this.next.prev = this.prev;

	return this;
};

module.exports = Node;
