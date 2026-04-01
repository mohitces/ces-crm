const express = require('express');
const validate = require('../../middlewares/validate');
const requireAuth = require('../../middlewares/auth');
const { requireRole } = require('../../middlewares/roles');
const settingsController = require('./settings.controller');
const { updateSettingsSchema } = require('./settings.validation');

const router = express.Router();

router.get('/', requireAuth, settingsController.getSettings);
router.get('/public', settingsController.getSettings);
router.put(
  '/',
  requireAuth,
  requireRole('admin'),
  validate(updateSettingsSchema),
  settingsController.updateSettings
);

module.exports = router;
