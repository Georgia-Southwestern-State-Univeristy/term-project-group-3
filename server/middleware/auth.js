function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized: Login required' });
  }
  next();
}

module.exports = { requireAuth };
