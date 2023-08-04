const ratelimit = require("express-rate-limit");

const loginLimiter = ratelimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message: "TOO MANY LOGIN ATTEMPTS! PLEASE TRY AGAIN AFTER 1 MINUTES",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: true,
});

module.exports = loginLimiter;
