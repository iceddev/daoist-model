var Property = require('../Property');
var when = require('when');

// NOTE: Using the original name, UniqueValidator.
// However, that seems like the wrong name, and that
// UniqueProperty would be a better name.

function UniqueValidator() {
	Property.apply(this, arguments);
}

UniqueValidator.prototype = Object.create(Property.prototype);
UniqueValidator.prototype.constructor = UniqueValidator;

var inheritedCheckForErrors = Property.prototype.checkForErrors;

//	summary:
//		A validator for enforcing unique values. This will
//		check a value to see if exists as an id in a store (by
//		calling get() on the store), and if get() returns a value,
//		validation will fail.
UniqueValidator.prototype.checkForErrors = function (value) {
	var property = this;
	// NOTE: it's unclear why when() is needed here in the original
	// code vs. not needed in the other validators, eg. StringValidator
	return when(inheritedCheckForErrors.apply(this, arguments), function (errors) {
		return when(property.uniqueStore.get(value), function (object) {
			if (object) {
				errors.push(property.uniqueError);
			}
			return errors;
		});
	});
};

// TODO: Once we define relationships with properties, we may want the
// store to be coordinated
//	uniqueStore: Store
//		The store that will be accessed to determine if a value is unique
UniqueValidator.prototype.uniqueStore = null;
//	uniqueError: String
//		The error message for when the value is not unique
UniqueValidator.prototype.uniqueError = 'The value is not unique';
