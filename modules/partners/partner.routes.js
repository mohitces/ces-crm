const express = require('express');
const validate = require('../../middlewares/validate');
const requireAuth = require('../../middlewares/auth');
const partnerController = require('./partner.controller');
const upload = require('./partner.upload');
const {
  partnerIdParamsSchema,
  createPartnerSchema,
  updatePartnerSchema,
} = require('./partner.validation');

const router = express.Router();

router.get('/', requireAuth, partnerController.getPartners);
router.get(
  '/:id',
  requireAuth,
  validate(partnerIdParamsSchema, 'params'),
  partnerController.getPartnerById
);
router.post('/', requireAuth, validate(createPartnerSchema), partnerController.createPartner);
router.post(
  '/upload/logo',
  requireAuth,
  upload.single('logo'),
  partnerController.uploadLogo
);
router.post(
  '/upload/banner',
  requireAuth,
  upload.single('bannerImage'),
  partnerController.uploadBanner
);
router.put(
  '/:id',
  requireAuth,
  validate(partnerIdParamsSchema, 'params'),
  validate(updatePartnerSchema),
  partnerController.updatePartner
);
router.delete(
  '/:id',
  requireAuth,
  validate(partnerIdParamsSchema, 'params'),
  partnerController.deletePartner
);

module.exports = router;
