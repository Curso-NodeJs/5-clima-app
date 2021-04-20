class Busquedas {
    historial = ['Bogota','Madrid','medellin'];
    
    constructor(){
        // TODO: leer DB si existe
    }
    
    async ciudad( lugar = '' ){
        // Petición http
        console.log(lugar);
        
        return []; // retornar los lugares
    }
}

module.exports = {
    Busquedas
}