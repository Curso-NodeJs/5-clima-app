const fs = require('fs');
const axios = require('axios');


class Busquedas {
    historial = [];
    dbPath = './db/database.json';
    constructor(){
        // TODO: leer DB si existe
        this.leerDB();
    }
    
    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        };
    }
    
    get paramsOpenWeather(){
        return {
            appid: process.env.OPEN_WEATHER_KEY,
            units: 'metric',
            lang: 'es'     
        }
    }
    
    get historialCapitalizado(){
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( palabra => palabra[0].toUpperCase() + palabra.substring(1) )
            return palabras.join(' ');
        })
    }
    
    
    async ciudad( lugar = '' ){
        // Petición http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json?`,
                params: this.paramsMapbox
            });
            
            const resp = await instance.get();
            return resp.data.features.map( lugar => {
                return {
                    id: lugar.id,
                    nombre: lugar.place_name,
                    lng: lugar.center[0],
                    lat: lugar.center[1],
                }
            } );
        } catch (error) {
            return [];
        }
        
    }
    
    async climaLugar(lat, lon){
        const parametros = {
            
        }
        try {
            // instancia de axios.create
            const instancia = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsOpenWeather,
                    lat,
                    lon
                }
            });
            
            const respuesta = await instancia.get();
            const { weather, main} = respuesta.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }                
            
        } catch (error) {
            console.log(error);
        }
    }
    
    agregarHistorial(lugar = ''){
        // TODO: prevenir duplicados
        if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return;
        }
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();
    }
    
    guardarDB(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );
    }
    
    leerDB(){
        if(!fs.existsSync(this.dbPath)){
            return;
        }
        const data = fs.readFileSync( this.dbPath, { encoding: 'utf-8' } );
        const info = JSON.parse(data);
        this.historial = [...info.historial];
    }
    
    
}

module.exports = {
    Busquedas
}