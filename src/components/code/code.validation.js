const joi = require('joi');

class CodeValidation {
  // Code data schema
  CodeDataSchema = {
    body: joi.object({
      content: joi.string().strict().required(),
      userId: joi.string().required(),
    }).unknown(),
  };

  ChatDataSchema = {
    body: joi.object({
      message: joi.string().strict().required(),
    }).unknown(),
  };
}

module.exports = new CodeValidation();
