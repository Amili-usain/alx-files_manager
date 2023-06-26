/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

// Import the MongoDB module
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Get the MongoDB connection options from environment variables or use default values
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Construct the MongoDB connection URI
    const uri = `mongodb://${host}:${port}/${database}`;

    // Create a MongoDB client
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    // Initialize the client and connect to the MongoDB server
    this.client.connect((error) => {
      if (error) {
        console.error('Error connecting to MongoDB:', error);
      } else {
        console.log('Connected to MongoDB successfully.');
      }
    });
  }

  isAlive() {
    // Check if the MongoDB client is connected to the server
    return this.client.isConnected();
  }

  async nbUsers() {
    // Use the MongoDB client to count the number of documents in the users collection
    const db = this.client.db();
    const usersCollection = db.collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    // Use the MongoDB client to count the number of documents in the files collection
    const db = this.client.db();
    const filesCollection = db.collection('files');
    return filesCollection.countDocuments();
  }
}

// Create an instance of DBClient and export it
const dbClient = new DBClient();
module.exports = dbClient;
