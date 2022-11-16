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
        name: undefined
    },
    flightsList : [], 
    allPrices : 0, 
    flightsScale : [], 
    lastFlights : [],
}
const airline = () =>{
    airlineData.user.name = prompt('Bienvenido a ISDI Coders Airlines! \nIntroduzca su nombre:');
    while (airlineData.user.name == ''){
        alert('No ha introducido nungun valor.');
        airlineData.user.name = prompt('Por favor, introduzca su nombre:');
    }if(airlineData.user.name == null){
        alert('Buen viaje.');
    }else{
    airlineDataShow();
    }
}
const airlineDataShow = () => {
    airlineDataManagement()
    console.log(`Bienvenido, ${airlineData.user.name}.`+"\nA continuación le mostramos los vuelos disponibles: ");
    console.log(airlineData.flightsList.join(''));
    console.log(`El PRECIO MEDIO de los vuelos es de ${airlineData.allPrices/flights.length}€.`);
    console.log("\nA continuación le mostramos los vuelos CON ESCALA: \n" + airlineData.flightsScale.join(''));
    console.log('Los destinos de los ULTIMOS vuelos de hoy son: \n' + airlineData.lastFlights.join(''));
}
const airlineDataManagement = () => {
    for ( num in flights ){
        airlineData.flightsList.push( `\n ${flights[num].id + 1}. Origen: ${flights[num].from} ==> ${flights[num].to}. ${flights[num].cost}€ ${flights[num].scale ? 'con escala.' : 'sin escala.'}`);
        airlineData.allPrices += flights[num].cost;
        if ( flights[num].scale == true ){
            airlineData.flightsScale.push( `\nOrigen: ${flights[num].from} ==> ${flights[num].to}. ${flights[num].cost}€ `);
        };
        if (flights[num].id - 5 < 0){
            airlineData.lastFlights.push( `\n${flights[num].to}.`);
        }
    }
}
airline()
