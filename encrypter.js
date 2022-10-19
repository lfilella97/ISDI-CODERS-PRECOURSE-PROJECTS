let numbers = [], lastNumbers = [], result = []
let counter = 0, multyplier
const codeScript = (...num) => {
    multyplier == undefined ? multyplier = 1 : multyplier
    if( (!(num == lastNumbers)) && (counter == 0)){
        multyplier = num.map(code => code.pop())
        numbers = []
        num[0].map(code => numbers.push((code*multyplier).toString().split('')))
        numbers.map(code => code.push(code.shift()))
        lastNumbers = num;
        counter += 1
    }else{
        numbers.map(code => code.push(code.shift()));
        (counter == (num[0].toString()).length -1) ? counter = 0 : counter += 1
    };
    console.log(numbers.map(code => (code).join('')).toString())
    return  
}
