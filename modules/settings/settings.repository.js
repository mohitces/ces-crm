const Settings = require('./settings.model');

const SETTINGS_KEY = 'global';

const getSettings = async () => Settings.findOne({ key: SETTINGS_KEY });

const upsertSettings = async (payload) =>
  Settings.findOneAndUpdate({ key: SETTINGS_KEY }, payload, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });

module.exports = {
  getSettings,
  upsertSettings,
};
