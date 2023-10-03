const joi = require('joi');

class UserValidation {
  // user data schema
  userDataSchema = {
    body: joi.object({
      name: joi.string().allow('').strict().trim(),
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: joi.string().required(),
    }).unknown(),
  };
}

module.exports = new UserValidation();
