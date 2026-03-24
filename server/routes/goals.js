const { requireAuth } = require('../middleware/auth');

// Create a new goal
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, targetDate } = req.body;
    const goal = new Goal({
      title,
      targetDate,
      userId: req.session.userId, // assume user ID from session
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create goal' });
  }
});
