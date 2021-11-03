const moment = require('moment');


function isValidDate(date) {
    const fecha = moment(date, 'YYYY-MM-DD');
    const fechaInicial = moment(new Date(),'YYYY-MM-DD').add(-2,'days');

    const fechaInicialFormated = fechaInicial.toISOString().substring(0, 10);
    const fechaLimite = moment(fechaInicialFormated, "YYYY-MM-DD").add(15, 'days');
    const fechaLimiteFormated = fechaLimite.toISOString().substring(0, 10);
    console.log(fechaInicialFormated+"---"+fechaLimiteFormated)
    if (fecha.isValid() && fecha.isBetween(fechaInicialFormated,fechaLimiteFormated)) {
        return true;
    }

    return false; // out range date
}

function isFutureDay(fechaEvento){
    const fechaHoy = new Date();
    const fechaHoyFormated = fechaHoy.toISOString().substring(0, 10);

    return moment(fechaEvento).isAfter(fechaHoyFormated);
}

module.exports = {
    isValidDate: function (data) {
        return isValidDate(data);
    },
    isFutureDay: function (fechaEvento){
        return isFutureDay(fechaEvento)
    }
};