// business logic & try (connection initialization) – finally(connection-release)
const pool = require('../../../.config/dbConn');
const dataTrim = require('../../utils/dataTrim');
const createName = require('../../utils/userNameCreation');
const userDal = require('./user.dal');

class UserService {
  registerUserService = async(userRegisterationData) => {
    const client = await pool.connect();
    try {
      let { name, email, password } = userRegisterationData;
      email = dataTrim(email);
      password = dataTrim(password);

      // if name is undefined or empty
      if (name === undefined || name === '') {
        // create name using user email string before '@' with random more than 2-digits
        name = createName(email);
      } else {
        name = dataTrim(name);
      }

      return userDal.registerUser(client, { name, email, password });
    } finally {
      client.release();
    }
  };

  loginUserService = async(userLoginData) => {
    const client = await pool.connect();

    try {
      let { email, password } = userLoginData;
      email = dataTrim(email);
      password = dataTrim(password);

      const userLoggedInStatusCode = await userDal.loginUser(client, { email, password });
      return userLoggedInStatusCode;
    } finally {
      client.release();
    }
  };

  findUserWithId = async(userId) => {
    const client = await pool.connect();
    const userDetailsFoundWithId = await userDal.findUserWithId(client, userId);
    return userDetailsFoundWithId;
  };
}

module.exports = new UserService();
