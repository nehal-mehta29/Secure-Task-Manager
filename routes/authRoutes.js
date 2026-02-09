const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields"
            })
        }

        
        //To check if the user already exists or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        // To create user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        })
        
    }

    catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

router.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            })
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        // Generate token
        const token = jwt.sign(
            {user: {_id: user._id}},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.json({
            token,
            message: "Login successful"
        })
    } 
    
    catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

module.exports = router;