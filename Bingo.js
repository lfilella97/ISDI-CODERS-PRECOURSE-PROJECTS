const user = 
    {
    name : undefined,
    wannaPlay : true,
    line : true,
    line1 : 0,
    line2 : 0,
    line3 : 0,
    fullBingo : 0,
    card : {
        bingoCard : [],
        shownBingoCard : [],
        nicerBingoCard : [],
        },
    balls : {
        bingoNumbers : [],
        actualNumber : undefined
        }
    };
    
function bingo () {
    greetingsUser();
    if (user.wannaPlay === false){
        return
    };
    startGame();
    do{
    gameRound();
    }while(user.wannaPlay === !false);
    rePlay();
};
function greetingsUser () {
    getUserName();
    alert(`Bienvenido ${user.name} a ISDI CODERS BINGO!`);
};
function startGame () {
    restartGame();
    newBingoCard();
};
function gameRound () {
    showUserCard();
    confirmNewNumber();
    checkBingoNumbers();
    markUserCardNumbers();
    checkLineAndBingo();
    if (user.wannaPlay === false){
        return
    };
};
function rePlay () {
    user.wannaPlay = confirm('¿Quieres volver a jugar?');
    if(user.wannaPlay == true){
        bingo();
    }else{
        return;
    };
};
function getUserName () {
    while (promptCheck(user.name) === undefined){
    user.name = prompt('Introduzca su nombre');
    };
    if (promptCheck(user.name) === false){
        user.wannaPlay = false;
    };
    return user.name;
};
function promptCheck (it) {
    if (it === ''){ 
        alert('no has introducido ningun valor');
        return undefined;
    }else if ( it === undefined){
        return undefined;
    }else if(it === null){
        alert('bye!');
        return false;
    }; 
    return true;
};
function restartGame () {
   return user.balls.bingoNumbers = [],
          user.card.bingoCard = [], 
          user.card.shownBingoCard = [];
};
function showUserCard () {
    getUserBingoCard ();
    makeUserBingoCardNice();
    alert(`Este es su carton: \n| |${user.card.nicerBingoCard.join('| |')}`)
};
function getUserBingoCard () {
    if ( user.card.shownBingoCard.length < 15 ){// editar el 5 per 15 quan vulgi 15 numeros
        
        for ( let i = 0 ; i < 15 ; i++){// editar el 5 per 15 quan vulgi 15 numeros
        user.card.shownBingoCard.push(user.card.bingoCard[i].number);
        };
    };
    //user.card.shownBingoCard.sort();
};
function makeUserBingoCardNice () {
    user.card.nicerBingoCard = []
    for ( number in user.card.shownBingoCard ){
        if (number < 5){
            user.card.nicerBingoCard.push(user.card.shownBingoCard[number])
            if (number == 4){
                user.card.nicerBingoCard.push('\n')
            }
        }else if ( number < 10){
            user.card.nicerBingoCard.push(user.card.shownBingoCard[number])
            if (number == 9){
                user.card.nicerBingoCard.push('\n')
            }
        }else if ( number < 15){
            user.card.nicerBingoCard.push(user.card.shownBingoCard[number])
            if (number == 14){
                user.card.nicerBingoCard.push('\n')
            };
        };
    };
};
function confirmNewNumber (){
    if(user.balls.bingoNumbers.length < 90  ){
        do {
            user.balls.actualNumber = getRandomNumber();
        }while (checkActualNumber());
        user.wannaPlay = confirm(`Ha salido el numero: ${user.balls.actualNumber} `)
        if (!(promptCheck (user.wannaPlay))){
            return 
        }
        user.balls.bingoNumbers.push(user.balls.actualNumber);
    }else{
        confirm('No quedan mas bolas.');
    };
};
function checkActualNumber() {
    for (number in user.balls.bingoNumbers){
        if (user.balls.bingoNumbers[number] === user.balls.actualNumber){
            return true;
            break;
        };
    };
};
function checkBingoNumbers () {
    for (number in user.card.bingoCard){
        if (user.card.bingoCard[number].number === user.balls.actualNumber){
            return user.card.bingoCard[number].matched = true;
            break;
        };
    };
};
function markUserCardNumbers() {
    for(number in user.card.bingoCard){
        if(user.card.bingoCard[number].matched){
            user.card.shownBingoCard[number] = ' X ';
        };
    };
};
function checkLineAndBingo (){
    user.line1 = 0, user.line2 = 0, user.line3 = 0, user.fullBingo = 0;
    
    for (number in user.card.bingoCard){
        user.fullBingo +=user.card.bingoCard[number].matched;
        if ( number < 5){
            user.line1 += user.card.bingoCard[number].matched;
        }else if ( number < 10 ){
            user.line2 += user.card.bingoCard[number].matched;
        }else if ( number < 15 ){
            user.line3 += user.card.bingoCard[number].matched;
        };
    }; 
    if (user.line == true){
        if (user.line1 == 5 || user.line2 == 5 || user.line3 == 5 ){
            alert('¡Linea!')
            user.line = false 
        };
    };
    if (user.fullBingo == 15){
        alert('¡BINGO! Felicidades has completado el cartón');
        user.wannaPlay = false
    }
};
function newBingoCard () {
    for ( let i = 0 ; i < 3 ; i++ ){// editar el 1 per 3 quan vulgi 15 numeros
        newBingoCardLine();
    };
};
function newBingoCardLine (){  
    for ( let i = 0 ; i < 5 ; i++ ){
        do {
            user.balls.actualNumber = getRandomNumber();
        }while (checkBingoCardNumber());
        user.card.bingoCard.push({number: user.balls.actualNumber , matched: false});
    };
    return user.card.bingoCard;
};
function checkBingoCardNumber() {
    for (number in user.card.bingoCard){
        if (user.card.bingoCard[number].number === user.balls.actualNumber){
            return true;
            break;
        };
    };
};
function getRandomNumber () {
    do{
        randomNumber = Math.floor(Math.random() * 21 );//recorda canviar a 91
    }while(randomNumber == 0);
    if(randomNumber < 10){
        randomNumber = ('0').concat(randomNumber)
    }
    return randomNumber;
};
