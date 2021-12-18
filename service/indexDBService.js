let MongoClient = require('mongodb').MongoClient;
let config = require('../config');

module.exports = {
    insertCoinsPrice: async function (record) {
        let mongoClient = new MongoClient(config.mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            await mongoClient.connect();
            const collection = mongoClient.db(config.dbName).collection('pasar_cmc_price');
            await collection.insertOne(record);
        } catch (err) {
            logger.error(err);
        } finally {
            await mongoClient.close();
        }
    },

    removeOldPriceRecords: async function (time) {
        let mongoClient = new MongoClient(config.mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            await mongoClient.connect();
            const collection = mongoClient.db(config.dbName).collection('pasar_cmc_price');
            await collection.deleteMany({timestamp: {$lt: time}})
        } catch (err) {
            logger.error(err);
        } finally {
            await mongoClient.close();
        }
    },

    getLatestPrice: async function (record) {
        let mongoClient = new MongoClient(config.mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            await mongoClient.connect();
            const collection = mongoClient.db(config.dbName).collection('pasar_cmc_price');
            return await collection.findOne({},{sort:{timestamp: -1}});
        } catch (err) {
            logger.error(err);
        } finally {
            await mongoClient.close();
        }
    },
}
