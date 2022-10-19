let numbers = [], lastNumbers = [], result = []
let counter = 0, multyplier
const decrypter = (...num) => {
    multyplier == undefined ? multyplier = 1 : multyplier
    while(counter != 0 ){
        if( (!(num == lastNumbers)) && (counter == 0)){
            multyplier = num.pop()
            numbers = []
            num.map(code => numbers.push((code*multyplier).toString().split('')))
            numbers.map(code => code.push(code.shift()))
            lastNumbers = num;
            counter += 1
        }else{
            numbers.map(code => code.push(code.shift()));
            (counter == (num[0][0].toString()).length -1) ? counter = 0 : counter += 1
        };
    };
    console.log(numbers.map( code => (code.join('')/multyplier)).toString())
    return  
};
