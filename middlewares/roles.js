const AppError = require('../utils/AppError');

const normalizeRole = (role) => String(role || '').trim().toLowerCase();

const requireRole = (...roles) => (req, res, next) => {
  const allowed = roles.map((role) => normalizeRole(role));
  const current = normalizeRole(req.user?.role);
  if (!current || !allowed.includes(current)) {
    return next(new AppError('Forbidden', 403));
  }
  return next();
};

module.exports = { requireRole, normalizeRole };
