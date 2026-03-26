const asyncHandler = require('../../utils/asyncHandler');
const authService = require('./auth.service');

const login = asyncHandler(async (req, res) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip =
    (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(',')[0]?.trim() ||
    req.ip ||
    '';
  const userAgent = req.headers['user-agent'] || '';
  const result = await authService.login(req.body, { ip, userAgent });
  res.status(200).json(result);
});

const me = asyncHandler(async (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    profileImage: user.profileImage || '',
    lastLoginAt: user.lastLoginAt,
    lastLoginIp: user.lastLoginIp,
    mfaEnabled: user.mfaEnabled || false,
  });
});

module.exports = {
  login,
  me,
};
