import rateLimit from "express-rate-limit";

export const postLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // Limit each IP to 5 post creations per window
  message: {
    success: false,
    message:
      "You're spilling too much tea! Take a break and come back in an hour.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
