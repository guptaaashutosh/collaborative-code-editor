const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

class JwtToken {
  generateJwtToken = async(data) => {
    const token = await jwt.sign({ id: data.id }, JWT_SECRET, { expiresIn: '1d' });
    return token;
  };

  verifyJwtToken = async(token) => {
    const data = await jwt.verify(token, JWT_SECRET);
    // console.log(`verfied token data : ${data.id}`);
    return data.id;
  };
}

module.exports = new JwtToken();
