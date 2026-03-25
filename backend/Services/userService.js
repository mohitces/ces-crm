const userDao = require('../dao/userDao');

exports.getUsers = async () => {
  return await userDao.getUsers();
};

exports.getUserById = async (id) => {
  return await userDao.getUserById(id);
};

exports.createUser = async (payload) => {
  return await userDao.createUser(payload);
};

exports.updateUser = async (id, payload) => {
  return await userDao.updateUser(id, payload);
};

exports.deleteUser = async (id) => {
  return await userDao.deleteUser(id);
};
