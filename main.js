var LinkedList = require("./linkedList");

try {
	var myList = new LinkedList();
	myList.push(7);
	myList.push(3);
	myList.shift();
	myList.pop();
	myList.unshift(7);
	myList.unshift(8);
	
	myList.shift();
	myList.shift();
} catch (e) {
	console.log(e.message);
	process.exit(0);	
}
