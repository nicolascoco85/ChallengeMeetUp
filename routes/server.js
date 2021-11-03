const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DB = require('../models/database');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (request, response) => {
    response.json({
        name: "MEETUP api",
        version: "v1",
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Escuchando en localhost:"+port);
    DB.connect();
});