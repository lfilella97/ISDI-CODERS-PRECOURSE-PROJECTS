
let digitOne = prompt('introduce el primer número:');
let digitTwo = prompt('introduce el segundo número:');

let aceptarDoble = (digitOne === "" && digitTwo === "");
let nullDoble = (digitOne === null && digitTwo === null);
let zeroDoble = (digitOne === "0" && digitTwo === "0");

let aceptar = (digitOne === "" || digitTwo === "");
let nu11 = (digitOne === null || digitTwo === null);
let zero = (digitOne === "0" || digitTwo === "0");

let cal = []

function calculadora(){
    
    if ( aceptarDoble || nullDoble || zeroDoble || (aceptar && nu11 || nu11 && zero || aceptar && zero) ){
        alert('Los valores introducidos no son correctos.');
        result = 'Error! *1*';
    }else if (aceptar || nu11){
            digitOne = Number(digitOne);
            digitTwo = Number(digitTwo);
            if(!(isNaN(digitOne) || isNaN(digitTwo))){
                !(digitOne === 0 ) ? result = 'El cuadrado de ' + digitOne + ' es: ' + digitOne*digitOne + '.' : result = 'El cuadrado de ' + digitTwo + ' es: ' + digitTwo*digitTwo + '.'
            }else{
                alert('Los valores introducidos no son correctos.');
                result = 'Error! *2*';
            }
    }else{
        digitOne = Number(digitOne);
        digitTwo = Number(digitTwo);
        if (isNaN(digitOne) || isNaN(digitTwo)){
            alert('Los valores introducidos no son correctos.');
            result = 'Error! *3*';
        }else {
            suma = digitOne + digitTwo
            resta = digitOne - digitTwo
            multiplicacion = digitOne * digitTwo
            division = digitOne / digitTwo
            
            mensaje = 'El calculo con los numeros ' + digitOne +', ' + digitTwo + ' es: '
            cal = [suma, resta, multiplicacion, division]
            for ( i = 0 ; i < cal.length ; i++ ){
                if( !(Number.isInteger(cal[i])) ){
                   cal[i] = cal[i].toFixed(3)
                }
            }
            result = mensaje + cal[0] + ', ' + cal[1] + ', ' + cal[2] + ' y ' + cal[3] + '.'
        }
    }
    return console.log(result)
}
calculadora()
