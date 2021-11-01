
function GetPropocionCervezaPorPersonaByTemp(temp){

    if (temp >= 24) {
        return 3;
    }
    if (temp >=20 && temp < 24) {
        return 1;
    }
    if (temp < 20) {
        return 0.75;
    }
}

function GetLatasDeCerveza(personas, proporcion){
    return personas * proporcion;
}

function GetCajasdeCervezas(latas) {
    let cajas = Math.ceil(latas / 6);
    return cajas;
}



module.exports = {
    ObtenerNumeroDeCajas : function ObtenerNumeroDeCajas(personas, temperatura){
        const proporcion = GetPropocionCervezaPorPersonaByTemp(temperatura);
        const numeroDeLatas = GetLatasDeCerveza(personas, proporcion);
        return GetCajasdeCervezas (numeroDeLatas)
    }
}