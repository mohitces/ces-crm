const queryRepository = require('./query.repository');
const AppError = require('../../utils/AppError');

const createQuery = async (payload) => queryRepository.createQuery(payload);

const getQueries = async () => queryRepository.getQueries();

const getQueryById = async (id) => {
  const query = await queryRepository.getQueryById(id);
  if (!query) {
    throw new AppError('Client query not found', 404);
  }
  return query;
};

module.exports = {
  createQuery,
  getQueries,
  getQueryById,
};
