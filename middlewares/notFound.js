const notFound = (req, res, next) => {
    res.status(404).json({ error: true, message: "404 not found"})
}

module.exports = notFound