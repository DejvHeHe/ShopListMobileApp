const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ code: "NoToken", message: "Missing or invalid token" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Přidej decoded data do requestu
        req.user = {
            userId: decoded.userId,
            email: decoded.email // pokud je v tokenu
        };

        next(); // token je platný → pokračuj k controlleru
    } catch (err) {
        console.error("Auth middleware error:", err);
        return res.status(401).json({ code: "InvalidToken", message: "Token is invalid or expired" });
    }
}

module.exports = authMiddleware;
