const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    //To read the authorization header
    const authHeader = req.header("Authorization");

    if (!authHeader){
        return res.status(401).json({
            message: "Access denied. No token provided."
        })
    }

    //To extract token
    const token = authHeader.split(" ")[1];

    //If token format is incorrect
    if (!token){
        return res.status(401).json({
            message: "Access denied. Invalid token format."
        })
    }

    try{
        
        //To verify the token using JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user information to request object so that it can be used in protected routes
        req.user = decoded.user;

        //Moving to next middleware
        next();
    }

    catch(error){

        //If validation fails
        res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}

module.exports = authMiddleware;