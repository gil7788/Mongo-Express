const request = require('supertest');
const app = require('../../app');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;


async function getChaiExpect() {
    const chai = require('chai');
    const chaiHttp = require('chai-http');
    chai.use(chaiHttp);
    return chai.expect;
}

const expect = getChaiExpect;

describe('Posts API', function() {
    let db;
    let postsCollection;
    let postId;

    // Setup connection to the database
    before(async function() {
        db = await MongoClient.connect('mongodb://localhost:27017');
        postsCollection = db.collection('posts');
    });

    // Clean up database after tests
    after(async function() {
        await postsCollection.deleteMany({});
        await db.close();
    });

    // Test the POST /posts route
    it('should create a new post', async function() {
        const postData = { title: 'Test Post', author: 'Author' };
        const response = await request(app)
            .post('/posts')
            .send(postData)
            .expect(204);

        const insertedPost = await postsCollection.findOne({ title: 'Test Post' });
        expect(insertedPost).to.not.be.null;
        postId = insertedPost._id; // Save post ID for later tests
    });

    // Test the GET /posts route
    it('should retrieve a list of posts', async function() {
        const response = await request(app)
            .get('/posts')
            .expect('Content-Type', /json/)
            .expect(200);

        const posts = response.body;
        expect(posts).to.be.an('array');
        expect(posts).to.have.lengthOf.at.least(1);
    });

    // Test the PATCH /posts/comment/:id route
    it('should add a comment to a post', async function() {
        const commentData = { text: 'Test Comment', date: new Date() };
        await request(app)
            .patch(`/posts/comment/${postId}`)
            .send(commentData)
            .expect(200);

        const updatedPost = await postsCollection.findOne({ _id: ObjectId(postId) });
        expect(updatedPost.comments).to.be.an('array').that.is.not.empty;
    });

    // Test the GET /posts/:id route
    it('should retrieve a single post', async function() {
        await request(app)
            .get(`/posts/${postId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const post = response.body;
                expect(post).to.have.property('title', 'Test Post');
            });
    });

    // Test the DELETE /posts/:id route
    it('should delete a post', async function() {
        await request(app)
            .delete(`/posts/${postId}`)
            .expect(200);

        const deletedPost = await postsCollection.findOne({ _id: ObjectId(postId) });
        expect(deletedPost).to.be.null;
    });

    // Additional tests can be added here for other routes like /posts/latest
});
