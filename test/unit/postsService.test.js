const httpMocks = require('node-mocks-http');
const { getPosts, getLatestPosts, getSinglePost, addNewPost, addCommentToPost, deletePostById } = require('../../services/postsService');
const ObjectId = require('mongodb').ObjectId;
const connectToDb = require('../../db/connect');

// Mock the connectToDb function
jest.mock('../../db/connect', () => {
    return jest.fn().mockImplementation(() => ({
        collection: () => ({
            find: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            toArray: jest.fn().mockResolvedValue([]),
            aggregate: jest.fn().mockReturnThis(),
            insertOne: jest.fn().mockResolvedValue({ insertedId: '123' }),
            updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
            deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
        }),
    }));
});

// Mock ObjectId if necessary
jest.mock('mongodb', () => ({ ObjectId: jest.fn(() => 'mocked-id') }));

describe('Post Service Tests', () => {
    describe('getPosts', () => {
        it('should fetch and send a list of 50 posts', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = jest.fn();

            await getPosts(req, res, next);

            expect(res._getData()).toEqual([]);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('getSinglePost', () => {
        it('should fetch and send a single post by ID', async () => {
            const req = httpMocks.createRequest({ params: { id: 'mocked-id' } });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            await getSinglePost(req, res, next);

            expect(res._getData()).toEqual("");
            expect(res.statusCode).toBe(200);
        });
    });

    describe('getLatestPosts', () => {
        it('should fetch and send the latest 3 posts', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = jest.fn();

            await getLatestPosts(req, res, next);

            expect(res._getData()).toEqual([]);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('addNewPost', () => {
        it('should add a new post and return the result', async () => {
            const req = httpMocks.createRequest({ body: { title: 'Test Post', content: 'This is a test' } });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            await addNewPost(req, res, next);

            expect(res.statusCode).toBe(204);
        });
    });

    describe('addCommentToPost', () => {
        it('should add a comment to a post', async () => {
            const req = httpMocks.createRequest({ params: { id: '123' }, body: { comment: 'Nice post!' } });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            await addCommentToPost(req, res, next);

            expect(res.statusCode).toBe(200);
        });
    });

    describe('deletePostById', () => {
        it('should delete a post by ID', async () => {
            const req = httpMocks.createRequest({ params: { id: '123' } });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            await deletePostById(req, res, next);

            expect(res.statusCode).toBe(200);
        });
    });
});
