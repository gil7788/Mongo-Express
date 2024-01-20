var express = require('express');
var connectToDb = require('../db/connect.js');
var ObjectId = require('mongodb').ObjectId;
const postsService = require("../services/postsService");

const router = express.Router();

async function dbConnect(req, res, next) {
    try {
      req.db = await connectToDb();
      next();
    } catch (error) {
      next(error);
    }
}
router.use(dbConnect);


function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }

// Get a list of 50 posts
router.get("/", postsService.getPosts);

// Fetches the latest posts
router.get("/latest", postsService.getLatestPosts);

// Get a single post
router.get("/:id", postsService.getSinglePost);

// Add a new document to the collection
router.post("/", postsService.addNewPost);

// Update the post with a new comment
router.patch("/comment/:id", postsService.addCommentToPost);

// Delete an entry
router.delete("/:id", postsService.deletePost);

router.use(errorHandler);

module.exports = router;
