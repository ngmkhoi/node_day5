const notFound = (req, res, _) => {
    res.error(404, `Can not ${req.method} ${req.url}`);
}

module.exports = notFound;