const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let MeetUpSchema = new Schema({
    date: { type: Date, default: Date.now },
    name: { type: String, default: 0 },
    invitations: { type: Number, default: 0 },
    city: { type: String, default: "BS AS" },
});

module.exports = mongoose.model("MeetUpSchema", MeetUpSchema);