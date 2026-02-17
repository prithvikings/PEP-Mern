export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isBanned) {
      req.logout(() => {});
      return res.status(403).json({ message: 'You have been banned.' });
    }
    return next();
  }
  res.status(401).json({ message: 'Login required' });
};

export const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Access denied. Admins only.' });
};
