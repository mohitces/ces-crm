const { getDashboardData } = require('./dashboard.service');

const getDashboard = async (req, res) => {
  try {
    const data = await getDashboardData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load dashboard data', error: error.message });
  }
};

module.exports = { getDashboard };
