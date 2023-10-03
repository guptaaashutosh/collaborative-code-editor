const { validate } = require('express-validation');
// express-validation exposes the following api:
// validate(schema, [options], [joiOptions]) => [validationError]

module.exports = (schema) => validate(schema, { context: false, statusCode: 400, keyByField: false }, {});
