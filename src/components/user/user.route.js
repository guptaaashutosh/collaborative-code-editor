const express = require('express');

const router = express.Router();
const userValidation = require('./user.validation');
const userController = require('./user.controller');
const dataValidation = require('../../utils/dataValidation');

// used dataValidation middleware express-validation to validate schema of the body data

router.route('/register').post(dataValidation(userValidation.userDataSchema), userController.registerUser);

router.route('/login').post(dataValidation(userValidation.userDataSchema), userController.loginUser);

module.exports = router;
