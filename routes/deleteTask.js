/*========================= DELETE =========================*/

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// DELETE a task by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: "Task not found" });
        
        res.json({ message: "Task deleted successfully" });
    } 
    catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;