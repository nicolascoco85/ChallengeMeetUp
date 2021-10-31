const http = require("https");
const config = require ("../config/config")

const axios = require("axios").default;

var options = {
    method: 'GET',
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
    params: { units: 'metric', lang: 'es'},
    headers: {
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': config.TOKEN_WEATHER
    }
};


module.exports = {
    getClima: function (fecha,geoCoord) {
        let promise = new Promise( (resolve, reject) => {
            options.params.lon = geoCoord.lon;
            options.params.lat = geoCoord.lat;
            axios.request(options).then(function (response) {
                const date = response.data.data.find(dia => dia.valid_date === fecha)
                console.log(date);
                resolve(date.temp)
            }).catch(function (error) {
                console.error(error);
                reject(error)
            });
        });
            return promise;
    }};