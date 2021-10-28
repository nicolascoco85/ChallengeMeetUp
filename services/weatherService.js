const http = require("https");
const config = require ("../config/config")

const options = {
    "method": "GET",
    "hostname": "weatherbit-v1-mashape.p.rapidapi.com",
    "port": null,
    "path": "/current?lon=-58.3&lat=-34.6&units=metric&lang=es",
    "headers": {
        "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
        "x-rapidapi-key": config.TOKEN_WEATHER,
        "useQueryString": true
    }
};


module.exports = {
    getClima: function () {
        let promise = new Promise( (resolve, reject) => {
            const req = http.request(options, function (res) {
                const chunks = [];
                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });
                res.on("end", function () {
                    const body = Buffer.concat(chunks);
                    const temp = JSON.parse(body.toString())
                    resolve(temp.data[0].temp);
                });
            });
           req.end();
        });
            return promise;
    }};