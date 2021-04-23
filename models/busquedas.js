const axios = require('axios');


class Busquedas {
    historial = ['Bogota','Madrid','medellin'];
    
    constructor(){
        // TODO: leer DB si existe
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
        this.historial.unshift(lugar);
    }
}

module.exports = {
    Busquedas
}