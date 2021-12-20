let MongoClient = require('mongodb').MongoClient;
let config = require('../config');

module.exports = {
    getLastPanelEventSyncHeight: async function (event) {
        let mongoClient = new MongoClient(config.mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            await mongoClient.connect();
            const collection = mongoClient.db(config.dbName).collection('pasar_panel_event');
            let doc = await collection.findOne({event}, {sort:{blockNumber: -1}});
            if(doc) {
                return doc.blockNumber
            } else {
                return config.galleriaContractDeploy - 1;
            }
        } catch (err) {
            logger.error(err);
            throw new Error();
        } finally {
            await mongoClient.close();
        }
    },

    addPanelEvent: async function(event) {
        let mongoClient = new MongoClient(config.mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            await mongoClient.connect();
            const collection = mongoClient.db(config.dbName).collection('pasar_panel_event');
            await collection.insertOne(event);
        } catch (err) {
            logger.error(err);
        } finally {
            await mongoClient.close();
        }
    }
}
