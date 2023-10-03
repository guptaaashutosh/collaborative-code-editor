const express = require('express');

const router = express.Router();

const user = require('./user/user.route');
const codeEditor = require('./code/code.route');

router.use('/user', user);
router.use('/code', codeEditor);

module.exports = router;
