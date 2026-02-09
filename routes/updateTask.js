/*========================= UPDATE =========================*/

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// UPDATE a task by ID
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        // To find the task first
        const task = await Task.findById(req.params.id);
        
        //If the task doesnot exist
        if (!task){
            return res.status(404).json({message: "Task not found"});
        }

        //Authorization check
        if(task.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "Not authorized to update this task"
            })
        }

        // Update allowed fields
        task.title = req.body.title ?? task.title;
        task.description = req.body.description ?? task.description;
        task.completed = req.body.completed ?? task.completed;

        //To save updated task
        await task.save();

        re.status(200).json(task);
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
