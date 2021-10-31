const moment = require('moment');


function isValidDate(date) {
    const fecha = moment(date, 'YYYY-MM-DD');
    const fechaInicial = new Date();

    const fechaInicialFormated = fechaInicial.toISOString().substring(0, 10);
    const fechaLimite = moment(fechaInicialFormated, "YYYY-MM-DD").add(15, 'days');
    const fechaLimiteFormated = fechaLimite.toISOString().substring(0, 10);
    console.log(fechaInicialFormated+"---"+fechaLimiteFormated)
    if (fecha.isValid() && fecha.isBetween(fechaInicialFormated,fechaLimiteFormated)) {
        return true;
    }

    return false; // out range date
}

module.exports = {
    isValidDate: function (data) {
        return isValidDate(data);
    },
};