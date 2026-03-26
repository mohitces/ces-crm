const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const AppError = require('../../utils/AppError');

const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL || 'admin@ces-pl.com';
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || 'Pa$$w0rd';

const buildToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new AppError('JWT_SECRET is not configured', 500);
  }

  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

const login = async ({ email, password }, meta = {}) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail, isActive: true }).select('+password');

  if (!user || !user.password) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  user.lastLoginAt = new Date();
  user.lastLoginIp = meta.ip || user.lastLoginIp || '';
  user.lastLoginUserAgent = meta.userAgent || user.lastLoginUserAgent || '';
  await user.save();

  const token = buildToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      profileImage: user.profileImage || '',
    },
  };
};

const ensureDefaultAdmin = async () => {
  const normalizedEmail = DEFAULT_ADMIN_EMAIL.toLowerCase().trim();
  const existing = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!existing) {
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
    await User.create({
      name: 'CES Admin',
      email: normalizedEmail,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });
    console.log(`Default admin created in Atlas: ${normalizedEmail}`);
    return;
  }

  let needsSave = false;

  if (!existing.password) {
    existing.password = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
    needsSave = true;
  }
  if (existing.role !== 'admin') {
    existing.role = 'admin';
    needsSave = true;
  }
  if (!existing.isActive) {
    existing.isActive = true;
    needsSave = true;
  }

  if (needsSave) {
    await existing.save();
  }
};

const getUserFromToken = async (token) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new AppError('JWT_SECRET is not configured', 500);
  }

  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (error) {
    throw new AppError('Invalid or expired token', 401);
  }

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

module.exports = {
  login,
  ensureDefaultAdmin,
  getUserFromToken,
};
