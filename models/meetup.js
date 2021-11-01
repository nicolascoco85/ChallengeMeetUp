const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let MeetUpSchema = new Schema({
    date: { type: String, default: "2021-01-01" },
    name: { type: String, default: 0 },
    guestUserIds: [String],
    city: { type: String, default: "BS AS" },
});

module.exports = mongoose.model("MeetUpSchema", MeetUpSchema);