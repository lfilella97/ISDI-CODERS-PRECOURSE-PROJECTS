const user = 
    {
    name : undefined,
    wannaPlay : true,
    prize : {
        line : true,
        line1 : 0,
        line2 : 0,
        line3 : 0,
        fullBingo : 0,
        },
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
const ranking = 
    {
    memory : [], 
    final : []
};
    
function bingo () {
    greetingsUser();
    if (user.wannaPlay === false){
        return;
    };
    startGame();
    gameRound();
    getRanking();
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
        return;
    };
};
function getRanking (){
    if(user.prize.fullBingo == 15){
        ranking.memory.push({name : user.name, score: user.balls.bingoNumbers.length});
        ranking.final = [];
        for ( number in ranking.memory){
            ranking.final.unshift(ranking.memory[number].name + ' ==> ' + ranking.memory[number].score + '\n');
        };
        alert('Este es el ranking actual\n' + ranking.final.join(''));
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
    keepUserName();
    while (promptCheck(user.name) === undefined){
    user.name = prompt('Introduzca su nombre');
    };
    if (promptCheck(user.name) === false){
        user.wannaPlay = false;
    };
};
function keepUserName () {
    if((user.name) !== undefined){
     confirm('¿Seguir con el mismo usuario?') ? user.name  : user.name = undefined;
    };
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
    if ( user.card.shownBingoCard.length < 15 ){
        for ( let i = 0 ; i < 15 ; i++){
        user.card.shownBingoCard.push(user.card.bingoCard[i].number);
        };
    };
};
function makeUserBingoCardNice () {
    user.card.nicerBingoCard = [];
    for ( number in user.card.shownBingoCard ){
        if (number < 5){
            user.card.nicerBingoCard.push(user.card.shownBingoCard[number]);
            if (number == 4){
                user.card.nicerBingoCard.push('\n');
            };
        }else if ( number < 10){
            user.card.nicerBingoCard.push(user.card.shownBingoCard[number]);
            if (number == 9){
                user.card.nicerBingoCard.push('\n');
            };
        }else if ( number < 15){
            user.card.nicerBingoCard.push(user.card.shownBingoCard[number]);
            if (number == 14){
                user.card.nicerBingoCard.push('\n');
            };
        };
    };
};
function confirmNewNumber (){
    if(user.balls.bingoNumbers.length < 91  ){
        do {
            user.balls.actualNumber = getRandomNumber();
        }while (checkActualNumber());
        user.wannaPlay = confirm(`Ha salido el numero: ${user.balls.actualNumber}.`);
        if (!(promptCheck (user.wannaPlay))){
            return;
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
    user.prize.line1 = 0, user.prize.line2 = 0, user.prize.line3 = 0, user.prize.fullBingo = 0;
    for (number in user.card.bingoCard){
        user.prize.fullBingo +=user.card.bingoCard[number].matched;
        if ( number < 5){
            user.prize.line1 += user.card.bingoCard[number].matched;
        }else if ( number < 10 ){
            user.prize.line2 += user.card.bingoCard[number].matched;
        }else if ( number < 15 ){
            user.prize.line3 += user.card.bingoCard[number].matched;
        };
    }; 
    if (user.prize.line == true){
        if (user.prize.line1 == 5 || user.prize.line2 == 5 || user.prize.line3 == 5 ){
            alert('¡Linea!')
            user.prize.line = false 
        };
    };
    if (user.prize.fullBingo == 15){
        alert('¡BINGO! Felicidades has completado el cartón');
        user.wannaPlay = false;
    };
};
function newBingoCard () {
    for ( let i = 0 ; i < 3 ; i++ ){
        newBingoCardLine();
    };
};
function newBingoCardLine (){  
    for ( let i = 0 ; i < 5 ; i++ ){
        do {
            user.balls.actualNumber = getRandomNumber();
        }while (checkBingoCardNumber());
        user.card.bingoCard.push({number: user.balls.actualNumber, matched: false});
    };
    return;
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
        randomNumber = Math.floor(Math.random() * 91 );
    }while(randomNumber == 0);
    if(randomNumber < 10){
        randomNumber = ('0').concat(randomNumber);
    };
    return randomNumber;
};
