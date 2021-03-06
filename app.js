var indexRouter = require("./routes/index");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");



var middleware = require("./routes/midddleware");

var app = express();

const options = {
    explorer: true, // habilita el explorar para hacer busquedas
    swaggerOptions: {
        validatorUrl: null,
    },
    // customCss: '.swagger-ui .topbar { display: none }'// Desactiva el la cabecera que dice swagguer ui
};
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

let handleCorsHeaders = function (req, res, next) {
    if (req.get("Origin") != null) {
        res.header("Access-Control-Allow-Origin", req.get("Origin"));
        res.header("Access-Control-Allow-Credentials", "true");
        if (req.get("Access-Control-Request-Method")) {
            res.header("Access-Control-Allow-Methods", req.get("Access-Control-Request-Method"));
        }
        if (req.get("Access-Control-Request-Headers")) {
            res.header("Access-Control-Allow-Headers", req.get("Access-Control-Request-Headers"));
        }
        if (req.method === "OPTIONS") {
            res.status(200).send();
        } else {
            next();
        }
    } else {
        next();
    }
};

app.use(handleCorsHeaders);

app.use(express.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(middleware.errorHandler);

module.exports = app;