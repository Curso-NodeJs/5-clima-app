require('dotenv').config()
const { leerInput,inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer')
const { Busquedas } = require('./models/busquedas');

const main = async () => {
    let opt;
    const busquedas = new Busquedas();
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                    // Mostrar mensaje
                    const terminoBusqueda = await leerInput('Ciudad: ');
                    const lugares = await busquedas.ciudad( terminoBusqueda );
                    const idSeleccionado = await listarLugares(lugares)
                    if(idSeleccionado === '0') continue;
                    const lugarSeleccionado = lugares.find(l => l.id === idSeleccionado);
                    // Buscar los lugares

                    // Seleccionar el lugar
                    
                    // Datos del clima
                    const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);
                    // Mostar resultados
                    console.clear();
                    console.log(` \n Información de la ciudad \n`.green);
                    console.log('Ciudad: ', lugarSeleccionado.nombre.green);
                    console.log('Lat: ', lugarSeleccionado.lat);
                    console.log('Lng: ',lugarSeleccionado.lng);
                    console.log('Temperatura:', clima.temp);
                    console.log('Mínima:', clima.min);
                    console.log('Maxima: ', clima.max);
                    console.log('Como está el clima: ', clima.desc.green);
                break;
                case 2:

                break;
        
            default:
                break;
        }
        
        await pausa();
    } while (opt !== 0);
}

main();