const express = require('express');
const validate = require('../../middlewares/validate');
const requireAuth = require('../../middlewares/auth');
const { requireRole } = require('../../middlewares/roles');
const partnerController = require('./partner.controller');
const upload = require('./partner.upload');
const {
  partnerIdParamsSchema,
  createPartnerSchema,
  updatePartnerSchema,
} = require('./partner.validation');

const router = express.Router();

router.get('/', requireAuth, partnerController.getPartners);
router.get('/public', partnerController.getPublicPartners);
router.get(
  '/:id',
  requireAuth,
  validate(partnerIdParamsSchema, 'params'),
  partnerController.getPartnerById
);
router.post(
  '/',
  requireAuth,
  requireRole('admin', 'editor'),
  validate(createPartnerSchema),
  partnerController.createPartner
);
router.post(
  '/upload/logo',
  requireAuth,
  requireRole('admin', 'editor'),
  upload.single('logo'),
  partnerController.uploadLogo
);
router.post(
  '/upload/banner',
  requireAuth,
  requireRole('admin', 'editor'),
  upload.single('bannerImage'),
  partnerController.uploadBanner
);
router.put(
  '/:id',
  requireAuth,
  requireRole('admin', 'editor'),
  validate(partnerIdParamsSchema, 'params'),
  validate(updatePartnerSchema),
  partnerController.updatePartner
);
router.delete(
  '/:id',
  requireAuth,
  requireRole('admin', 'editor'),
  validate(partnerIdParamsSchema, 'params'),
  partnerController.deletePartner
);

module.exports = router;
