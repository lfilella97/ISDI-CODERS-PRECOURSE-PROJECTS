 
const flights = [
  { id: 00, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 02, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 03, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 04, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 05, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 07, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 08, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];
const airlineData = { 
    user : {
        name : undefined,
        priceSearch : undefined,
        flightsFiltred : [],
        rang : undefined,
        admin : {
            addFlight : undefined,
            introducedPrice : undefined,
            cancelFlight : undefined,
            deletedFlightsID : [],
            deletedFlights : [],
        },
    },
    flightsList : [], 
    allPrices : 0, 
    flightsScale : [], 
    lastFlights : [],
}
const airline = () =>{
    greetingsUser();
    rankUser();
    airlineData.user.rang == 'admin' ? adminDataList() : 
    airlineData.user.rang == 'user' ? userDataList() : false ;
    alert('Introduce airline() en la consola para volver a empezar. \nHasta la próxima');
}
const greetingsUser = () => {
    airlineData.user.name = prompt('Bienvenido a ISDI Coders Airlines! \nIntroduzca su nombre:');
    while (airlineData.user.name == ''){
        alert('No ha introducido nungun valor.');
        airlineData.user.name = prompt('Por favor, introduzca su nombre:');
    }if(airlineData.user.name == null){
        alert('Buen viaje.');
    }else{
    dataManagement();
    console.log(`Bienvenido, ${airlineData.user.name}.`+"\nA continuación le mostramos los vuelos disponibles: ");
    console.log(airlineData.flightsList.join(''));
    console.log(`El PRECIO MEDIO de los vuelos es de ${airlineData.allPrices/flights.length}€.`);
    console.log("\nA continuación le mostramos los vuelos CON ESCALA: \n" + airlineData.flightsScale.join(''));
    console.log('Los destinos de los ULTIMOS vuelos de hoy son: \n' + airlineData.lastFlights.join(''));
    }
}
const rankUser = () => {
    airlineData.user.rang = prompt('Introduzca su rango: \n (ADMIN/USER)');
    airlineData.user.rang == 'ADMIN' ? airlineData.user.rang = 'admin' : 
    airlineData.user.rang == 'USER' ? airlineData.user.rang = 'user' : 
    airlineData.user.rang;
    while (!(airlineData.user.rang == 'admin' || 
             airlineData.user.rang == 'user' )){
        alert('No ha introducido nungun rango valido.');
        airlineData.user.rang = prompt('Por favor, introduzca su rango:\n (ADMIN/USER:)');
    }
}
const adminDataList = () => {
    airlineData.user.admin.addFlight = ((prompt(`Bienvenido ${airlineData.user.name} (Admin), ¿quieres añadir vuelos nuevos? \n Si (aceptar) / No (cancelar)`) == null) ? false : true);
    while(flights.length < 15 && airlineData.user.admin.addFlight == true){//Añadir vuelos
        flights.push({id: flights.length , to: undefined, from: undefined, cost: undefined, scale: undefined });
        flights[flights.length - 1].to = (prompt('A continuacion debes añadir los datos del vuelo: \n Destino:'));
        flights[flights.length - 1].from = prompt('A continuacion debes añadir los datos del vuelo: \n Salida:');
        airlineData.user.admin.introducedPrice = +prompt('A continuacion debes añadir los datos del vuelo: \n Precio:');
            (Number.isNaN(airlineData.user.admin.introducedPrice)) ? flights[flights.length - 1].cost = 0 : flights[flights.length - 1].cost = airlineData.user.admin.introducedPrice;
        flights[flights.length - 1].scale = prompt('A continuacion debes añadir los datos del vuelo: \n Escala: Si (aceptar) / No (cancelar)') == null ? false : true ;
        airlineData.user.admin.addFlight = ((prompt('¿Quieres añadir mas vuelos? \n Si (aceptar) / No (cancelar)') == null) ? false : true); 
    }if (flights.length == 15) {
        alert('No puedes introducir mas vuelos.');
    }
    dataManagement();
    let count =[];
    airlineData.user.admin.cancelFlight = ((prompt('¿Quieres eliminar algun vuelo? \n Si (aceptar) / No (cancelar)') == null) ? false : true);
    while (airlineData.user.admin.cancelFlight == true){
        count.push(prompt('Introduce el numero de vuelo a eliminar: \n(solo se tendran en cuanta numeros de vuelos existentes) \n\n ' + airlineData.flightsList.join('')));
        (count < 15) ? airlineData.user.admin.deletedFlightsID.push(+count) : false;
        count = [];   
        airlineData.user.admin.cancelFlight = ((prompt('¿Quieres eliminar algun vuelo? \n Si (aceptar) / No (cancelar)') == null) ? false : true); 
    }
    dataManagement();
    dataManagement(); //se repite para eliminar de la lista final los vuelos. (airlineData.flightsList)
    console.log(airlineData.flightsList.join(''));
}
const userDataList = () => {
    (alert(`Bienvenido ${airlineData.user.name} (User), \nAhora podras filtrar los vuelos por precio, pulsa aceptar \ne introduce un precio. \n\nVeras todos los vuelos que esten por debajo.`));
    airlineData.user.priceSearch = prompt('Filtrar por precio');
    while (Number.isNaN(airlineData.user.priceSearch)){
        alert('No ha introducido nungun valor valido.');
        airlineData.user.priceSearch = prompt('Por favor, introduzca un precio:');
    }
    dataManagement();
    console.log(airlineData.user.flightsFiltred.join(''));
}
const dataManagement = () => {
    airlineData.allPrices = 0 ;
    airlineData.flightsList = [];
    airlineData.flightsScale = [];
    airlineData.lastFlights = [];
    airlineData.user.flightsFiltred = [];
    for ( num in flights ){
        airlineData.flightsList.push( `\n ${flights[num].id}. Origen: ${flights[num].from} ==> ${flights[num].to}. ${flights[num].cost}€ ${flights[num].scale ? 'con escala.' : 'sin escala.'}`);
        airlineData.allPrices += flights[num].cost; //precio medio
        if (flights[num].scale == true ){//filtrado por escala
            airlineData.flightsScale.push( `\nOrigen: ${flights[num].from} ==> ${flights[num].to}. ${flights[num].cost}€ `);
        }
        if (flights[num].id > flights.length - 6){//filtrado ultimos 5 vuelos
            airlineData.lastFlights.push( `\n${flights[num].to}.`);
        }
        if (flights[num].cost <= airlineData.user.priceSearch){//filtrado por precio
            airlineData.user.flightsFiltred.push( `\nOrigen: ${flights[num].from} ==> ${flights[num].to}. ${flights[num].cost}€ `);
        }
    }if ( airlineData.user.admin.deletedFlightsID[0] != undefined){//vuelos eliminados por admin eliminados de la lista de vuelos
        for ( num in flights ){
            for ( let i = 0 ; i < airlineData.user.admin.deletedFlightsID.length ; i++){
                if (flights[num].id == airlineData.user.admin.deletedFlightsID[i]){
                    airlineData.user.admin.deletedFlights = flights.splice(num,1);
                }
            }
        }
        airlineData.user.admin.deletedFlightsID = [];
    }
}
airline();
