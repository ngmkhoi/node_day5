const exceptionHandler = (err, req, res, _) => {
    const statusCode = err.statusCode || err.status || 500;

    if (typeof res.error === 'function') {
        res.error(statusCode, err.message || "Internal Server Error");
    } else {
        res.status(statusCode).json({
            status: "error",
            message: err.message || "Internal Server Error"
        });
    }
}

module.exports = exceptionHandler;