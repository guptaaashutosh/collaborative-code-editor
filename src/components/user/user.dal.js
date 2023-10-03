const httpStatusCode = require('../../constants/httpStatusCode');
const JwtToken = require('../../utils/jwtToken');

class UserDal {
  registerUser = async(client, data) => {
    const registerUserQuery = 'INSERT INTO editor_schema.user(name,email,password) VALUES ($1,$2,$3)';
    const registerUserValues = [data.name, data.email, data.password];
    const registerUserResponse = await client.query(registerUserQuery, registerUserValues);
    return registerUserResponse.rowCount;
  };

  loginUser = async(client, data) => {
    const loginUserQuery = 'SELECT * FROM editor_schema.user WHERE email=$1 AND password=$2';
    const loginUserValues = [data.email, data.password];
    const userLoggedInDetails = await client.query(loginUserQuery, loginUserValues);
    // handling error to generate token
    if (userLoggedInDetails.rowCount !== 0) {
      // generating token of loggedIn user
      const generatedToken = await JwtToken.generateJwtToken(userLoggedInDetails.rows[0]);
      // store token in database
      await this.storeToken(client, generatedToken);
      return httpStatusCode.OK;
    }
    return httpStatusCode.BAD_REQUEST;
  };

  storeToken = async(client, token) => {
    const id = await JwtToken.verifyJwtToken(token);
    const text = 'UPDATE editor_schema.user SET token=$1 WHERE id=$2';
    const values = [token, id];
    const response = await client.query(text, values);
    return response;
  };

  findUserWithId = async(client, id) => {
    const text = 'SELECT id,name,email,createdat,token FROM editor_schema.user WHERE id=$1'; // id
    const values = [id];
    const userDetails = await client.query(text, values);
    return userDetails.rows[0];
  };
}

module.exports = new UserDal();
