import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/db.js';

// Import local modules (Must add .js extension)
import passportConfig from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import confessionRoutes from './routes/confessionRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Initialize DB
connectDB();

// Passport Config
passportConfig(passport);

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL, // e.g., http://localhost:5173
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/confessions', confessionRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});