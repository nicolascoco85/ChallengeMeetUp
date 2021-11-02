const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DB = require('../models/database');
const weatherService = require('../services/weatherService')
const validationService = require('../services/validationService')
const meetUpService = require('../services/meetUpService')
const userService = require('../services/userService')
const proovedorService = require('../services/proveedorService')
const middleware = require("../routes/midddleware");
const config = require("../config/config")

async function getBeer(req, res) {
    console.log(req.query.id)
    const id =req.query.id
    const geoCoordBsAs = {lon:-58.3, lat:-34.6}
    if (id) {
        try {
            const meetup = await meetUpService.getMeetUp(id);
            console.log(meetup.date);
            const temp = await weatherService.getClima(meetup.date,geoCoordBsAs);
            const boxBeers = proovedorService.ObtenerNumeroDeCajas(meetup.guestUserIds.length, temp)
            res.json({NumberBoxBeer: boxBeers})
        } catch (error) {
            res.status(400).send({
                message: "invalid id meet up " + id,
            });
        }
    } else {
        return res.status(400).send({
            message: "invalid id meet up " + id,
        });
    }
}

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



app.post('/meetup', async(req, res) => {
    console.log(req.body.date)
    console.log(req.body.name)
    const fecha = req.body.date.toString()
    const name = req.body.name.toString()

    if (validationService.isFutureDay(fecha)) {
        try {
            await meetUpService.create(name,fecha);
            res.json({state:"Created"})
        } catch (error) {
            res.status(400).send({
                message: "Out range date value " + fecha,
            });
        }
    } else {
        return res.status(400).send({
            message: "Out range date value " + fecha,
        });
    }
});

app.get('/user/:id', async(req, res) => {
    console.log(req.params.id);

    const idUser = req.params.id;

    const user = await userService.getUser(idUser);
    if (user) {
        try {
             res.json({
                 username: user.user,
                 pass: user.password,
                 token: user.role =="ADMIN" ? config.TOKEN_SECRET_JWT :"query user"
             })
        } catch (error) {
            res.status(400).send({
                message: "No exist user id" + idUser,
            });
        }
    } else {
        return res.status(400).send({
            message: "Error join meetup " + idMeetUp +"--"+ idUser,
        });
    }
});

app.post('/user/query', async(req, res) => {

    const password = req.body.password
    const user = req.body.user

    if (user && password ) {
        try {
            let result = await userService.getUserByNameAndPass(user,password);
            res.json({
                username: result.user,
                pass: result.password,
                token: result.role.toString().toUpperCase() =="ADMIN" ? config.TOKEN_SECRET_JWT :"No token, you are query user"
            })
        } catch (error) {
            res.status(400).send({
                message: "Out range date value " + user,
            });
        }
    } else {
        return res.status(400).send({
            message: "Out range date value " + fecha,
        });
    }
});



app.post('/meetup', async(req, res) => {
    console.log(req.body.date)
    console.log(req.body.name)
    const fecha = req.body.date.toString()
    const name = req.body.name.toString()

    if (validationService.isFutureDay(fecha)) {
        try {
            await meetUpService.create(name,fecha);
             res.json({state:"Created"})
        } catch (error) {
            res.status(400).send({
                message: "Out range date value " + fecha,
            });
        }
    } else {
        return res.status(400).send({
            message: "Out range date value " + fecha,
        });
    }
});

app.post('/user', async(req, res) => {
    console.log(req.body.user)
    console.log(req.body.password)
    console.log(req.body.role)
    const password = req.body.password
    const user = req.body.user
    const role = req.body.role

    if (user && password ) {
        try {
            await userService.create(user,password,role);
            res.json({state:"Created"})
        } catch (error) {
            res.status(400).send({
                message: "Out range date value " + user,
            });
        }
    } else {
        return res.status(400).send({
            message: "Out range date value " + fecha,
        });
    }
});

app.route("/meetup/").get(middleware.ensureAuthenticated, getBeer
/*app.get('/meetup/', async(req, res) => {
    console.log(req.query.id)
    const id =req.query.id
    const geoCoordBsAs = {lon:-58.3, lat:-34.6}
    if (id) {
        try {
            const meetup = await meetUpService.getMeetUp(id);
            console.log(meetup.date);
            const temp = await weatherService.getClima(meetup.date,geoCoordBsAs);
            const boxBeers = proovedorService.ObtenerNumeroDeCajas(meetup.guestUserIds.length, temp)
            res.json({NumberBoxBeer: boxBeers})
        } catch (error) {
            res.status(400).send({
                message: "invalid id meet up " + id,
            });
        }
    } else {
        return res.status(400).send({
            message: "invalid id meet up " + id,
        });
    }
})*/
);

app.put('/meetup/:id/join', async(req, res) => {
    console.log(req.params.id);
    console.log(req.body.userId);

    const idMeetUp = req.params.id;
    const idUser = req.body.userId;
    const meetUp = await meetUpService.getMeetUp(idMeetUp);
    const user = await userService.getUser(idUser);
    if (user && meetUp ) {
        try {
            meetUp.guestUserIds.push(idUser);
            await meetUp.save();
            res.json({state:"Joined"})
        } catch (error) {
            res.status(400).send({
                message: "Out range date value " + user,
            });
        }
    } else {
        return res.status(400).send({
            message: "Error join meetup " + idMeetUp +"--"+ idUser,
        });
    }
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Escuchando en localhost:" + port);
    DB.connect();
});