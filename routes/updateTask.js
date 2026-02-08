/*========================= UPDATE =========================*/

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// UPDATE a task by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
      
        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
      
        res.json(updatedTask);
    } 
    catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed', error: error.message });
        }
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(400).json({ message: "Invalid data or ID" });
    }
});

module.exports = router;
