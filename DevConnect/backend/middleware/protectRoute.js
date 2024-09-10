const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies && req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ msg: "You are not logged in" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        req.user = user;

        next();
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
        console.log("Error occurred in protectRoute: " + err.message);
    }
};

module.exports = protectRoute;
