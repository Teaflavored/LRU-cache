var LRUcache = require("./LRU");

var FibWithCache = function (maxsize) {
	var cache = new LRUcache(maxsize, {
		dontPrintList: false
	});

	this.getNthFib = function (n, useCache) {
		if (typeof useCache == "undefined") {
			useCache = true;
		}

		if (n < 0) {
			throw new Error("Can't pass in negative number into fib function.");
		}

		if (useCache) {
			return cache.get(n, this.getNthFib.bind( this , n, false  ));
		}

		if (n == 0) {
			return 0;
		} else if (n == 1) {
			return 1;
		}

		return this.getNthFib(n - 1) + this.getNthFib(n - 2);
	};

	this.printStats = function () {
		cache.printStats();
	};
};

var FibWithoutCache = function () {
	this.getNthFib = function (n) {
		if ( n == 0 ) {
			return 0;
		}

		if ( n == 1 ) {
			return 1;
		}
		return this.getNthFib(n - 1) + this.getNthFib( n - 2 );
	};
};


try {
	var timeStart = new Date();
	var cachedFib = new FibWithCache(5);
	console.log(cachedFib.getNthFib(100));
	var timeStop = new Date();
	
	console.log("It took " + ( timeStop.getTime() - timeStart.getTime() ) + "ms to finish running cached fib ");
	cachedFib.printStats();
	
	var uncachedFib = new FibWithoutCache();
} catch (e) {
	console.log(e.message);	
	process.exit(0);
}
