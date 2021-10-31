const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DB = require('../models/database');
const weatherService = require('../services/weatherService')
const validationService = require('../services/validationService')


app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (request, response) => {
    response.json({
        name: "MEETUP api",
        version: "v1",
    });
});

app.get('/clima/', async (request, response) => {
    const fecha = request.query.date.toString()
    const geoCoordBsAs = {lon:-58.3, lat:-34.6}
    if (validationService.isValidDate(fecha)) {
        try {
            const clima = await weatherService.getClima(fecha,geoCoordBsAs)
            response.json(clima);
        } catch (error) {
            return new Error(error);
        }
    } else {
        return response.status(400).send({
            message: "Out range date value " + request.query.date.toString(),
        });
    }

});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Escuchando en localhost:" + port);
    DB.connect();
});