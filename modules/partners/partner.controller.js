const asyncHandler = require('../../utils/asyncHandler');
const partnerService = require('./partner.service');
const { uploadImageBuffer } = require('../../utils/cloudinary');

const getPartners = asyncHandler(async (req, res) => {
  const partners = await partnerService.getPartners();
  res.json(partners);
});

const getPublicPartners = asyncHandler(async (req, res) => {
  const partners = await partnerService.getPublicPartners();
  res.json(partners);
});

const getPartnerById = asyncHandler(async (req, res) => {
  const partner = await partnerService.getPartnerById(req.params.id);
  res.json(partner);
});

const createPartner = asyncHandler(async (req, res) => {
  const partner = await partnerService.createPartner(req.body);
  res.status(201).json(partner);
});

const uploadLogo = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: 'Logo is required.' });
    return;
  }
  const upload = await uploadImageBuffer(file.buffer, { folder: 'ces/partners/logos' });
  res.status(201).json({ url: upload.secure_url, publicId: upload.public_id });
});

const uploadBanner = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: 'Banner image is required.' });
    return;
  }
  const upload = await uploadImageBuffer(file.buffer, { folder: 'ces/partners/banners' });
  res.status(201).json({ url: upload.secure_url, publicId: upload.public_id });
});

const updatePartner = asyncHandler(async (req, res) => {
  const partner = await partnerService.updatePartner(req.params.id, req.body);
  res.json(partner);
});

const deletePartner = asyncHandler(async (req, res) => {
  await partnerService.deletePartner(req.params.id);
  res.json({ message: 'Partner deleted' });
});

module.exports = {
  getPartners,
  getPublicPartners,
  getPartnerById,
  createPartner,
  uploadLogo,
  uploadBanner,
  updatePartner,
  deletePartner,
};
