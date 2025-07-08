
  const appointmentsModel = require('../Models/appointmentsModel');

// Controller to return appointment history
async function getAppointmentHistory(req, res) {
  const userId = req.user?.id; // Assumes auth middleware sets req.user

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const history = await appointmentsModel.getAppointmentHistory(userId);
    res.status(200).json({ history });
  } catch (err) {
    console.error("Error fetching appointment history:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAppointmentHistory
};