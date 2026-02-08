/*========================= CREATE =========================*/

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/", async (req, res) => {
    try{
        const {title, description} = req.body;

        if(!title || title.length < 3){
            return res.status(400).json({ message: "Title must be at least 3 characters" });
        }

        const task = new Task({ title, description });
        const savedTask = await task.save();

        res.status(201).json(savedTask);
    }

    catch(error){
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed', error: error.message });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;