export const errorHandlingMiddleware = (err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  console.log(err);
  res.status(status).json({ message: err.message });
};
