const validate = (schema, source = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[source], {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    error.statusCode = 400;
    error.message = error.details.map((detail) => detail.message).join(', ');
    return next(error);
  }

  req[source] = value;
  return next();
};

module.exports = validate;
