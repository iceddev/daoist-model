var Property = require('../Property');

// NOTE: Using the original name, StringValidator.
// However, that seems like the wrong name, and that
// StringProperty would be a better name.

//	summary:
//		A validator for enforcing string values
function StringValidator() {
	Property.apply(this, arguments);
}

StringValidator.prototype = Object.create(Property.prototype);
StringValidator.prototype.constructor = StringValidator;

var inheritedCheckForErrors = Property.prototype.checkForErrors;

StringValidator.prototype.checkForErrors = function(value) {
	var errors = inheritedCheckForErrors.apply(this, arguments);

	if (this.minimumLength >= value.length) {
		errors.push(this.minimumLengthError);
	}
	if (this.maximumLength < value.length) {
		errors.push(this.maximumLengthError);
	}
	if (this.pattern && !this.pattern.test(value)) {
		errors.push(this.patternMatchError);
	}
	return errors;
};

//	minimumLength: Number
//		The minimum length of the string
StringValidator.prototype.minimumLength = 0;
//	maximum: Number
//		The maximum length of the string
StringValidator.prototype.maximumLength = Infinity;
// pattern: Regex
//		A regular expression that the string must match
StringValidator.prototype.pattern = null;
//	minimumError: String
//		The error message for values that are too low
StringValidator.prototype.minimumLengthError = 'This is too short';
//	maximumError: String
//		The error message for values that are too high
StringValidator.prototype.maximumLengthError = 'This is too long';
//	patternMatchError: String
//		The error when a pattern does not match
StringValidator.prototype.patternMatchError = 'The pattern did not match';
