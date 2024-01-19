var express = require('express');
var connectToDb = require('../db/connect.js');
var ObjectId = require('mongodb').ObjectId;

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection("posts");
    const results = await collection.find({}).limit(50).toArray();
    res.send(results).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Fetches the latest posts
router.get("/latest", async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection("posts");
    const results = await collection.aggregate([
      {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
      {"$sort": {"date": -1}},
      {"$limit": 3}
    ]).toArray();
    res.send(results).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a single post
router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection("posts");
    const query = {_id: ObjectId(req.params.id)};
    const result = await collection.findOne(query);

    if (!result) res.status(404).send("Not found");
    else res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection("posts");
    const newDocument = req.body;
    newDocument.date = new Date();
    const result = await collection.insertOne(newDocument);
    res.status(204).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update the post with a new comment
router.patch("/comment/:id", async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection("posts");
    const query = { _id: ObjectId(req.params.id) };
    const updates = { $push: { comments: req.body } };
    const result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection("posts");
    const query = { _id: ObjectId(req.params.id) };
    const result = await collection.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
