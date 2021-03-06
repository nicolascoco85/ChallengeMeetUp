const mongoose = require("mongoose");
const config = require("../config/config.js");
const logger = require("../services/log/logService");

module.exports = {
    connect: async function (database) {
        const connectionString = database ? database : config.MONGODB_URI;
        try {
            await mongoose.connect(connectionString, config.MONGODB_CONFIG);
            logger.log("Successfully connected to the DB");
        } catch (err) {
            logger.error("Error connecting to DB: "+connectionString+"--" + err);
        }
    },
    disconnect: async () => await mongoose.disconnect(),
};