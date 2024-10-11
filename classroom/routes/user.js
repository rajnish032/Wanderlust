const express = require("express");
const router = express.Router();

// Index Route - Get all users
router.get("/", (req, res) => {
    res.send("Get all users");
});

// Show Route - Get a specific user by ID
router.get("/:id", (req, res) => {
    res.send(`Get user with ID: ${req.params.id}`);
});

// Create Route - Add a new user
router.post("/", (req, res) => {
    res.send("Create a new user");
});

// Delete Route - Delete a specific user by ID
router.delete("/:id", (req, res) => {
    res.send(`Delete user with ID: ${req.params.id}`);
});

module.exports = router;
