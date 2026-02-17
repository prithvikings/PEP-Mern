import Confession from '../models/Confession.models.js'; // Ensure .js
import User from '../models/user.models.js'; // Ensure .js

export const getReports = async (req, res) => {
  try {
    const reports = await Confession.find({ 'reports.0': { $exists: true } })
      .select('text reports isHidden createdAt')
      .populate('reports.userId', 'displayName email');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteAsAdmin = async (req, res) => {
    try {
        await Confession.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted by Admin' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}