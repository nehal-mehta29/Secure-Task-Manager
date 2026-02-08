/*========================= READ =========================*/

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

//To GET all tasks with filtering, pagination and sorting 
router.get("/", async (req, res) => {
    try {
        const {completed, title, _page, _limit, sortBy, order} = req.query;
        let query = {};

        //Filtering by completion status
        if (completed !== undefined){
            query.completed = completed === "true";
        }

        //Search by title
        if (title){
            query.title = {$regex: title, $options: "i"};
        }

        //Total count for pagination metadata
        const total = await Task.countDocuments(query);
        res.set("X-Total-Count", total);

        let taskQuery = Task.find(query);

        //Pagination
        if(_page && _limit){
            const page = parseInt(_page) || 1;
            const limit = parseInt(_limit) || 10;
            const skip = (page-1)*limit;
            taskQuery = taskQuery.skip(skip).limit(limit);
        }

        //Sorting
        let sortOptions = {createdAt : -1};  //Default newest first

        if (sortBy === "title"){
            sortOptions = {title : order === "desc" ? -1:1};
        }

        const tasks = await taskQuery.exec();

        res.json(tasks);
    } 

    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

//To GET a single task by ID
router.get("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } 
    catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
