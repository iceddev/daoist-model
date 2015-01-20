var when = require('when');

module.exports = Validating;

function Validating(store) {
	var inheritedPut = store.put;
	var inheritedAdd = store.add;

	return Object.create(store, {
		validate: {
			value: validate,
			writable: true, configurable: true, enumerable: false
		},
		put: {
			value: function validatePut(object, options) {
				var store = this;
				return when(this.validate(object), function (object) {
					return inheritedPut.call(store, object, options);
				});
			},
			writable: true, configurable: true, enumerable: false
		},
		add: {
			value: function validateGet(object, options) {
				var store = this;
				return when(this.validate(object, true), function (object) {
					return inheritedAdd.call(store, object, options);
				});
			},
			writable: true, configurable: true, enumerable: false
		}
	});
}

function validate(object) {
	//	summary:
	//		Validates the given object (by making it an instance of the
	//		current model, and calling validate() on it)
	//	object: Object
	//		The object to validate
	//	isNew: Boolean
	//		Indicates whether or not to assume the object is new or not
	if (!(object instanceof this.Model)) {
		object = this._restore(object);
	}
	return when(object.validate()).then(function (isValid) {
		if (!isValid) {
			// create and throw a validation error
			var validationError = new TypeError('Invalid property');
			validationError.errors = object.errors;
			throw validationError;
		}
		// return the object since it has had its prototype assigned
		return object;
	});
}
