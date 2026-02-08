// ECHO is on.

const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

//MongoDB connection
require('./config/db');

app.use(express.json());

// Import task routes (CRUD in separate files)
const createTask = require("./routes/createTask");
const readTask = require("./routes/readTask");
const updateTask = require("./routes/updateTask");
const deleteTask = require("./routes/deleteTask");

// Mount routes
app.use("/api/tasks", createTask); // POST
app.use("/api/tasks", readTask);   // GET, GET by ID
app.use("/api/tasks", updateTask); // PUT
app.use("/api/tasks", deleteTask); // DELETE

//Test route
app.get("/", (req,res) => {
    res.send("Ok");
})

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});