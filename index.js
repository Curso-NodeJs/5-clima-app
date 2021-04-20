const { leerInput,inquirerMenu, pausa } = require('./helpers/inquirer')
const { Busquedas } = require('./models/busquedas')

const main = async () => {
    let opt;
    const busquedas = new Busquedas();
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                    // Mostrar mensaje
                    const lugar = await leerInput('Ciudad: ');
                    console.log(lugar);
                    // Buscar los lugares
                    
                    // Seleccionar el lugar
                    
                    // Datos del clima
                    
                    // Mostar resultados
                    console.log(` \n Información de la ciudad \n`.green);
                    console.log('Ciudad',);
                    console.log('Lat',);
                    console.log('Lng',);
                    console.log('Temperatura',);
                    console.log('Mínima',);
                    console.log('Maxima',);
                break;
        
            default:
                break;
        }
        
        await pausa();
    } while (opt !== 0);
}

main();