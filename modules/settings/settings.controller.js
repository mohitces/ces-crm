const asyncHandler = require('../../utils/asyncHandler');
const settingsService = require('./settings.service');

const getSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.getSettings();
  res.json(settings);
});

const updateSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.updateSettings(req.body);
  res.json(settings);
});

module.exports = {
  getSettings,
  updateSettings,
};
