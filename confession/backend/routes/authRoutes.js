import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/`);
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(`${process.env.CLIENT_URL}/`);
  });
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

export default router;