const User = require('./user.model');

const getUsers = async ({ excludeEmail } = {}) => {
  const query = {};
  if (excludeEmail) {
    query.email = { $ne: excludeEmail.toLowerCase().trim() };
  }
  return User.find(query).sort({ createdAt: -1 });
};

const getUserById = async (id) => User.findById(id);
const getUserByEmail = async (email) => User.findOne({ email: email.toLowerCase().trim() });

const createUser = async (payload) => {
  const user = new User(payload);
  return user.save();
};

const updateUser = async (id, payload) => User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

const deleteUser = async (id) => User.findByIdAndDelete(id);

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
