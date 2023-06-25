import { MongoClient } from 'mongodb';

// Configuration constants
const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';

const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  /**
   * Constructs a new DBClient instance.
   * Initializes the MongoDB client and connects to the database.
   */
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(`${DATABASE}`);    // Connect to the MongoDB database
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * Checks if the MongoDB client is connected to the database.
   * @returns {boolean} True if connected, false otherwise.
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of documents in the "users" collection.
   * @returns {Promise<number>} The number of users.
   */
  async nbUsers() {
    const users = this.db.collection('users');
    const usersNum = await users.countDocuments();
    return usersNum;
  }

   /**
    * Retrieves the number of documents in the "users" collection.
    * @returns {Promise<number>} The number of users.
    */
    async nbFiles() {
    const files = this.db.collection('files');
    const filesNum = await files.countDocuments();
    return filesNum;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
