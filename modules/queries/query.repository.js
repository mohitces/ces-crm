const ClientQuery = require('./query.model');

const createQuery = async (payload) => {
  const query = new ClientQuery(payload);
  return query.save();
};

const getQueries = async () => ClientQuery.find().sort({ createdAt: -1 });

const getQueryById = async (id) => ClientQuery.findById(id);

module.exports = {
  createQuery,
  getQueries,
  getQueryById,
};
