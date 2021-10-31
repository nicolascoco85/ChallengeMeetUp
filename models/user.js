const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let UserSchema = new Schema({
    id: String,
    user: { type: String, default: 0 },
    password: { type: String, default: 0 },
    role: { type: String, default: "USER" },
});

module.exports = mongoose.model("UserSchema", UserSchema);