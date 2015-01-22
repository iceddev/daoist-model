var Model = require('../Model');

function HiddenProperties() {
	Model.apply(this, arguments);
}

HiddenProperties.prototype = Object.create(Model.prototype);
HiddenProperties.prototype.constructor = HiddenProperties;

HiddenProperties.prototype._setValues = function(values) {
	return this._values = values || {};
};

HiddenProperties.prototype._getValues = function() {
	return this._values;
};

HiddenProperties.prototype._restore = function(model) {
	var instance = Object.create(model.prototype);
	instance._values = this;
	return instance;
};

HiddenProperties.prototype.toJSON = function() {
	return this._values;
};
