const express = require("express");
const router = express.Router();

// Index Route - Get all posts
router.get("/", (req, res) => {
    res.send("Get all posts");
});

// Show Route - Get a specific post by ID
router.get("/:id", (req, res) => {
    res.send(`Get post with ID: ${req.params.id}`);
});

// Create Route - Add a new post
router.post("/", (req, res) => {
    res.send("Create a new post");
});

// Delete Route - Delete a specific post by ID
router.delete("/:id", (req, res) => {
    res.send(`Delete post with ID: ${req.params.id}`);
});

module.exports = router;
