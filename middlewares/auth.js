const AppError = require('../utils/AppError');
const authService = require('../modules/auth/auth.service');

const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      throw new AppError('Authorization token missing', 401);
    }

    const user = await authService.getUserFromToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = requireAuth;
