# Mongo Express

This is a basic guide to setting up an Express.js application using Git for version control and Yarn as the package manager. This setup includes integration with MongoDB, a popular NoSQL database.

## Setup
### Git
To install git and set up your project repository:

1. Create a new directory for your project: `mkdir <project-dirname>`
2. Change into your project directory: `cd <project-dirname>`
3. Initialize a new Git repository: `git init`
4. Create an empty Git repository on a platform like GitHub or GitLab
5. Add the remote repository URL to your local repository: `git remote add origin <repository clone url>`

### Yarn - Package Manager
To set up Yarn as your package manager:

- Download and install Yarn from [Yarn Installation Guide](https://classic.yarnpkg.com/en/docs/install)
- Ensure you are in your project directory: `cd <project-dirpath>`
- Initialize your project with Yarn: `yarn init -y`

## Usage

### Install Yarn Dependencies
- To install all the project dependencies defined in your `package.json`, run: `yarn install`

### Run the Application
- Start your Express application using Yarn: `yarn start`

## Test
To run tests for your application, use the following command:
- `yarn test`

## Manual Build
For manual build and setup from scratch, follow these steps:

- Generate an Express skeleton application: `npx express-generator`. For more details, refer to the [Express Application Generator](https://expressjs.com/en/starter/generator.html) guide.
- Copy following dependencies into `package.json` object:
  ```json
  "dependencies": {
      "axios": "^1.6.5",
      "cookie-parser": "~1.4.4",
      "debug": "~2.6.9",
      "express": "~4.16.1",
      "http-errors": "~1.6.3",
      "jade": "~1.11.0",
      "mongodb": "^6.3.0",
      "morgan": "~1.9.1"
    },
  "devDependencies": {
      "jest": "^29.7.0",
      "node-mocks-http": "^1.14.1",
    }
  ```
- `yarn install`


## Suggested Development Tools
### Postman
Postman is a popular API client that makes it easy to create, share, test, and document APIs. It offers a straightforward user interface for sending HTTP requests and viewing responses. 

- Download and installation instructions: [Download Postman](https://www.postman.com/downloads/)

### Mongo Compass
Mongo Compass is the official GUI for MongoDB. It allows you to visually explore your data, run queries, and interact with your MongoDB database.

- Download and installation instructions: [Download MongoDB Compass](https://www.mongodb.com/try/download/compass)

## References
- For more information on the Express Application Generator, visit [Express Application Generator](https://expressjs.com/en/starter/generator.html).
- For a comprehensive guide on MongoDB Data Model Design, see the "Data Model Design for MongoDB.pdf" file located in the root directory of this project. Might be outdated as it was public at 2015.