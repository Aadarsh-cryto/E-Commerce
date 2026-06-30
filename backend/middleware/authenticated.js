const jwt = require("jsonwebtoken"); 
const User = require("../model/User"); 

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authorization token is missing or invalid format"
        });
    }

    const token = authHeader.split(" ")[1];
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Access token has expired. Please login again."
            });
        }
        return res.status(401).json({
            success: false,
            message: "Invalid or missing access token"
        });
    }

    try {
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // CHANGE HERE: Poora user object request mein daal rahe hain
        req.user = user; 
        
        next(); 

    } catch (error) {
        console.error("MIDDLEWARE DATABASE ERROR:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in authentication process"
        });
    }
};

module.exports = { isAuthenticated };