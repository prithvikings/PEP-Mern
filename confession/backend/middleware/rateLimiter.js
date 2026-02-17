import rateLimit from 'express-rate-limit';

export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, 
  message: { message: 'Too many confessions posted, please try again after an hour' }
});

export const reactionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { message: 'You are reacting too fast.' }
});