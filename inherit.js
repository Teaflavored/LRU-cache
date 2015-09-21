var inherit = function (parent, child) {
	child.prototype = Object.create(parent.prototype);
};

module.exports = inherit;

