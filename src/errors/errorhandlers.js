module.exports = {
  /*
  catchAsyncErrors(apiHandler) {
    return (req, res, next) => {
      return apiHandler(req, res, next).catch(next);
    };
  },
  */
  wrongPathHandler: (req, res, next) => {
    res.status(404).json({ message: 'Route Not Found' });
  },
  errorHandler: (err, req, res, next) => {
    const response = {
      error: err.customError || 'Something went wrong',
      message: err.message || 'Internal Server Error',
    };
    res.status(err.statusCode || 500).json(response);
  },
};
