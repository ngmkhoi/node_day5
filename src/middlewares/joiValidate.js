const joiValidate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.error(422, errors[0]);
        }

        req.body = value;
        next();
    }
}

module.exports = { joiValidate };
