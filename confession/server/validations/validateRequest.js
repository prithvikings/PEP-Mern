export const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessages = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(" | ");

      return res.status(400).json({
        success: false,
        message: `Validation Failed -> ${errorMessages}`,
      });
    }

    // Replace req.body with the sanitized data (strips unexpected fields)
    req.body = result.data;
    next();
  };
};
