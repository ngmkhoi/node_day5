const responseFormat = ( req, res, next ) => {
    res.success = (data, code = 200, passProps = {}) => {
        res.status(code).json({
            status: "success",
            data: data,
            ...passProps
        });
    };

    res.error = (code, message) => {
        res.status(code).json({
            status: "error",
            message: message,
        });
    };

    next();
}

module.exports = responseFormat;