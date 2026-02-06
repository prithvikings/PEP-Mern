export default function loggerMiddleware(req, res, next) {
  console.log("Logger Middleware Executed");
  console.log(`${req.method} ${req.url}`);
  next();
}
