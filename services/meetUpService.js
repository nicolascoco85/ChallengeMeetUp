const MeetUp = require("../models/meetup");
const logger = require("./log/logService");

module.exports = {
    create: async function (name, date) {
        let meetup;
        try {
            meetup = new MeetUp({
                name: name,
                date: date
            });
            await meetup.save();
        } catch (error) {
            logger.error("Error creating a new meetup: " + JSON.stringify(name));
            logger.error(error);
            return error;
        }
    },
    getMeetUp: async function (meetUpId) {
        const meetup = await MeetUp.find({
            id: meetUpId,
        });
        return meetup;
    }
};