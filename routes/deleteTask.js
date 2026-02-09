/*========================= DELETE =========================*/

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// DELETE a task by ID
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedTask = await Task.findById(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ 
                message: "Task not found" 
            });
        }

        // Authorization check
        if (deletedTask.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to delete this task"
            });
        }

        await deletedTask.deleteOne();

        res.status(200).json({ message: "Task deleted successfully" });
    } 
    catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;