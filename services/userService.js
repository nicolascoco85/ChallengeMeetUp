const User = require("../models/user");
const logger = require("./log/logService");

module.exports = {
    create: async function (name, password,role) {
        let user;
        try {
            user = new User({
                user: name,
                password: password,
                role: role
            });
            await user.save();

        } catch (error) {
            logger.error("Error creating a new user: " + JSON.stringify(name));
            logger.error(error);
            return error;
        }
    },
    getUser: async function (userId) {
        const user = await User.findById(userId
        );
        return user;
    }
};