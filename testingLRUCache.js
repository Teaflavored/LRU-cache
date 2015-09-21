var LRUcache = require("./LRU");

var FibWithCache = function (maxsize) {
	var cache = new LRUcache(maxsize);


	this.getNthFib = function (n, useCache) {
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

		return this.getNthFib(n - 1, true) + this.getNthFib(n - 2, true);
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
	var cachedFib = new FibWithCache(10);
	console.log(cachedFib.getNthFib(30, true));
	cachedFib.printStats();
	
	var uncachedFib = new FibWithoutCache();
} catch (e) {
	console.log(e.message);	
	process.exit(0);
}
