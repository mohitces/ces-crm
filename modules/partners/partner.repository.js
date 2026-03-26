const Partner = require('./partner.model');

const getPartners = async () => Partner.find().sort({ createdAt: -1 });

const getPartnerById = async (id) => Partner.findById(id);

const getPartnerBySlug = async (slug) => Partner.findOne({ slug });

const createPartner = async (payload) => {
  const partner = new Partner(payload);
  return partner.save();
};

const updatePartner = async (id, payload) =>
  Partner.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

const deletePartner = async (id) => Partner.findByIdAndDelete(id);

module.exports = {
  getPartners,
  getPartnerById,
  getPartnerBySlug,
  createPartner,
  updatePartner,
  deletePartner,
};
