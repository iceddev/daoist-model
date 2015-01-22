var Property = require('../Property');


// NOTE: Using the original name, NumericValidator.
// However, that seems like the wrong name, and that
// NumericProperty would be a better name.

//	summary:
//		A validator for enforcing numeric values
function NumericValidator() {
	Property.apply(this, arguments);
}

NumericValidator.prototype = Object.create(Property.prototype);
NumericValidator.prototype.constructor = NumericValidator;

var inheritedCheckForErrors = Property.prototype.checkForErrors;

NumericValidator.prototype.checkForErrors = function(value) {
	var errors = inheritedCheckForErrors.apply(this, arguments);

	if (isNaN(value)) {
		errors.push(this.notANumberError);
	}
	if (this.minimum >= value) {
		errors.push(this.minimumError);
	}
	if (this.maximum <= value) {
		errors.push(this.maximumError);
	}
	return errors;
};

//	minimum: Number
//		The minimum value for the value
NumericValidator.prototype.minimum = -Infinity;
//	maximum: Number
//		The maximum value for the value
NumericValidator.prototype.maximum = Infinity;
//	minimumError: String
//		The error message for values that are too low
NumericValidator.prototype.minimumError = 'The value is too low';
//	maximumError: String
//		The error message for values that are too high
NumericValidator.prototype.maximumError = 'The value is too high';
//	notANumberError: String
//		The error message for values that are not a number
NumericValidator.prototype.notANumberError = 'The value is not a number';
