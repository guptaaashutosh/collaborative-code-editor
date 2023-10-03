const express = require('express');

const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const CodeController = require('./code.controller');
const dataValidation = require('../../utils/dataValidation');
const codeDateValidation = require('./code.validation');

// used verifyToken authentication middleware to authenticate the user
// used dataValidation middleware express-validation to validate schema of the body data

// new code creation
router.route('/create').post(verifyToken, dataValidation(codeDateValidation.CodeDataSchema), CodeController.createNewCode);

// new user to join the code
router.route('/join/:codeId').post(verifyToken, CodeController.newUserJoiningCode);

// user leaving code
router.route('/leave/:codeId').delete(verifyToken, CodeController.userLeavingCode);

// update the code content
router.route('/:codeId').put(verifyToken, dataValidation(codeDateValidation.CodeDataSchema), CodeController.updateCodeContent);

// get all the code version content details
router.route('/:codeId').get(verifyToken, CodeController.getCodeVersionDetails);

// delete the code of specific version
router.route('/:vid').delete(verifyToken, CodeController.deleteCodeVersionDetails);

// chat integration between users collaboration on code
router.route('/:codeId').post(verifyToken, dataValidation(codeDateValidation.ChatDataSchema), CodeController.usersChatCollaboratingOncode);

module.exports = router;
