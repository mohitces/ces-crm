const express = require('express');
const validate = require('../../middlewares/validate');
const requireAuth = require('../../middlewares/auth');
const settingsController = require('./settings.controller');
const { updateSettingsSchema } = require('./settings.validation');

const router = express.Router();

router.get('/', requireAuth, settingsController.getSettings);
router.get('/public', settingsController.getSettings);
router.put('/', requireAuth, validate(updateSettingsSchema), settingsController.updateSettings);

module.exports = router;
