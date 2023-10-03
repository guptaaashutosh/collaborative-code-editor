const message = require('../../constants/message');

const userServices = require('./user.services');

class UserController {
  registerUser = async(req, res, next) => {
    try {
      const registerData = await req.body;
      const value = await userServices.registerUserService(registerData);

      if (value === 0) {
        res.status(500).send({
          message: message.REGISTRATION_FAILED,
        });
      }
      res.status(200).send({
        message: message.REGISTER_DATA,
      });
    } catch (error) {
      next(error);
    }
  };

  loginUser = async(req, res, next) => {
    try {
      const loginData = await req.body;

      const loggedInStatusCode = await userServices.loginUserService(loginData);

      if (loggedInStatusCode === 200) {
        res.status(loggedInStatusCode).send({
          message: message.LOGGED_IN,
        });
      } else {
        res.status(loggedInStatusCode).send({
          message: message.INVALID_CREDENTIAL,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
