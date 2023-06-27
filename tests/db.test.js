import { expect } from 'chai';
import dbClient from '../utils/db';

describe('DBClient', () => {
  before((done) => {
    // Connect to the database before running the tests
    dbClient.mongoClient.connect(done);
  });

  after((done) => {
    // Close the database connection after running the tests
    dbClient.mongoClient.close(done);
  });

  describe('isAlive()', () => {
    it('should return true if the MongoDB client is connected', () => {
      expect(dbClient.isAlive()).to.be.true;
    });
  });

  describe('nbUsers()', () => {
    it('should return the number of documents in the "users" collection', async () => {
      const count = await dbClient.nbUsers();
      expect(count).to.be.a('number');
    });
  });

  describe('nbFiles()', () => {
    it('should return the number of documents in the "files" collection', async () => {
      const count = await dbClient.nbFiles();
      expect(count).to.be.a('number');
    });
  });

  describe('usersCollection()', () => {
    it('should return the "users" collection object', () => {
      const collection = dbClient.usersCollection();
      expect(collection).to.exist;
      expect(collection.collectionName).to.equal('users');
    });
  });

  describe('filesCollection()', () => {
    it('should return the "files" collection object', () => {
      const collection = dbClient.filesCollection();
      expect(collection).to.exist;
      expect(collection.collectionName).to.equal('files');
    });
  });
});
