import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.models.js'; // Added .js extension

export default function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      
      if (user) {
        return done(null, user);
      } else {
        const admins = process.env.ADMIN_IDS ? process.env.ADMIN_IDS.split(',') : [];
        const isAdmin = admins.includes(profile.id);

        user = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          role: isAdmin ? 'admin' : 'user'
        });
        return done(null, user);
      }
    } catch (err) {
      console.error(err);
      return done(err, null);
    }
  }));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user)).catch(err => done(err, null));
  });
};