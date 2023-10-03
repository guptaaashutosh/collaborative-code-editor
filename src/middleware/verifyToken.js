const { findUserWithId } = require('../components/user/user.services');
const { verifyJwtToken } = require('../utils/jwtToken');

const verifyToken = async(req, res, next) => {
  try {
    const token = req.headers.authorization;
    const userId = await verifyJwtToken(token);
    const user = await findUserWithId(userId);
    // if user not authorized
    if (!user) {
      res.status(403).json({
        message: 'Unauthorized user - please login to access',
      });
      return;
    }
    // if user is authorized setting body and sending to controller
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
