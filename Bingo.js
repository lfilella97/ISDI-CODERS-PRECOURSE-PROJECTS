const user = 
    {
    name : undefined,
    wannaPlay : true,
    game : {
        bingoNumbers : [],
        bingoCard : [],
        shownBingoCard : [],
        actualNumber : undefined
        }
    };
function bingo () {
    greetingsUser();
    if (user.wannaPlay === false){
        return
    };
    startGame();
    gameRound();
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
   return user.game.bingoNumbers = [],
          user.game.bingoCard = [], 
          user.game.shownBingoCard = [];
};
function showUserCard () {
    getUserBingoCard ();
    //alert(`Este es su carton: \n |${user.game.shownBingoCard.join('| |')}|`)
};
function getUserBingoCard () {
    user.game.shownBingoCard = [];
    for (let i = 0 ; i < 5 ; i++){
        user.game.shownBingoCard.push(user.game.bingoCard[i].number);
    };
    user.game.shownBingoCard.sort();
};
function confirmNewNumber (){
    if(user.game.bingoNumbers.length < 90  ){
        do {
            user.game.actualNumber = getRandomNumber();
        }while (checkActualNumber());
        //confirm(`Ha salido el numero: ${user.game.actualNumber} `)
        user.game.bingoNumbers.push(user.game.actualNumber);
    }else{
        confirm('No quedan mas bolas.');
    };
};
function checkActualNumber() {
    for (number in user.game.bingoNumbers){
        if (user.game.bingoNumbers[number] === user.game.actualNumber){
            return true;
            break;
        };
    };
};
function checkBingoNumbers () {
    for (number in user.game.bingoCard){
        if (user.game.bingoCard[number].number === user.game.actualNumber){
            return user.game.bingoCard[number].matched = true;
            break;
        };
    };
};
function newBingoCard () {
    for ( let i = 0 ; i < 1 ; i++ ){// editar el 1 per 3 quan vulgi 15 numeros
        newBingoCardLine();
    };
};
function newBingoCardLine (){  
    for ( let i = 0 ; i < 5 ; i++ ){
        user.game.bingoCard.push({number: getRandomNumber(), matched: false});
    };
    return user.game.bingoCard;
};
function getRandomNumber () {
    do{
        randomNumber = Math.floor(Math.random() * 91 );
    }while(randomNumber == 0);
    return randomNumber;
};
