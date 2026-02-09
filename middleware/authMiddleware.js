const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {

    //To read the authorization header
    const authHeader = req.header("Authorization");

    //Checking if the token exists and if is in the Beare format
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message: "Access denied. No token provided."
        })
    }

    //To extract token
    const token = authHeader.split(" ")[1];

    try{
        
        //To verify the token using JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // To find user from database using decoded ID
        const user = await User.findById(decoded.id).select("-password");

        if (!user){
            return res.status(401).json({
                message: "User not found"
            })
        }

        req.user = user;

        //Moving to next middleware
        next();
    }

    catch(error){

        //If validation fails
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}

module.exports = authMiddleware;