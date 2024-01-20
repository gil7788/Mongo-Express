var connectToDb = require('../db/connect.js');
var ObjectId = require('mongodb').ObjectId;

async function getPosts(req, res, next) {
    try {
        const db = await connectToDb();
        const collection = db.collection("posts");
        const results = await collection.find({}).limit(50).toArray();
        res.send(results).status(200);
    } catch (error) {
        next(error);
    }
}

async function getLatestPosts(req, res, next) {
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
            next(error);
        }
}

async function getSinglePost(req, res, next) {
    try {
        const db = await connectToDb();
        const collection = db.collection("posts");
        const query = {_id: ObjectId(req.params.id)};
        const result = await collection.findOne(query);
    
        if (!result) res.status(404).send("Not found");
        else res.send(result).status(200);
    } catch (error) {
            next(error);
    }
}

async function addNewPost(req, res, next) {
    try {
        const db = await connectToDb();
        const collection = db.collection("posts");
        const newDocument = req.body;
        newDocument.date = new Date();
        const result = await collection.insertOne(newDocument);
        res.status(204).send(result);
      } catch (error) {
            next(error);
      }
}

async function addCommentToPost(req, res, next) {
    try {
        const db = await connectToDb();
        const collection = db.collection("posts");
        const query = { _id: ObjectId(req.params.id) };
        const updates = { $push: { comments: req.body } };
        const result = await collection.updateOne(query, updates);
        res.send(result).status(200);
      } catch (error) {
            next(error);
      }
}

async function deletePostById(req, res, next) {
    try {
        const db = await connectToDb();
        const collection = db.collection("posts");
        const query = { _id: ObjectId(req.params.id) };
        const result = await collection.deleteOne(query);
        res.send(result).status(200);
      } catch (error) {
            next(error);
      }
}


