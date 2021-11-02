module.exports = {
    MONGODB_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/meetup",
    MONGODB_CONFIG: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    TOKEN_WEATHER: process.env.TOKEN_WEATHER ,
    TOKEN_SECRET: process.env.TOKEN_SECRET || "patena-secret-token-value",
    FRONT_END_NAME: process.env.FRONT_END_NAME || "patena-web-front-end",
    TOKEN_SECRET_JWT: process.env.TOKEN_SECRET_JWT ,
}