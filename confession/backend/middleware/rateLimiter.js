import rateLimit from 'express-rate-limit';

export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // INCREASED from 3 to 20 per hour
  message: { message: 'You are posting too fast. Take a break.' }
});

export const reactionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // INCREASED from 10 to 60 (1 per second is fine)
  message: { message: 'You are reacting too fast.' }
});