function verifyToken(req, res, next) {
    const bHeader = req.headers['authorization'];
    if (bHeader) {
        const bearerToken = bHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.status(403);
        next();
    }
}
module.exports = verifyToken