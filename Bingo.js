const user = 
    {
    name : undefined,
    wannaPlay : true,
    acceptCard : undefined,
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
        actualNumber : undefined,
        markNumber : false
        }
    };
const ranking = 
    {
    memory : [], 
    final : ['Por el momento no hay ninguna puntuación almacenada.']
};
let rapidGame = false
const bingo = () => {
    greetingsUser();
    if (user.wannaPlay === false){
        return;
    };
    showInfo()
    do{
    startGame();
    }while(checkBingoCard());
    do{
    gameRound();
    }while(user.wannaPlay === !false);
    getRanking();
    rePlay();
};
const greetingsUser = () => {
    getUserName();
    alert(`Bienvenido ${user.name} a ISDI CODERS BINGO!`);
};
const showInfo = () => {
    alert(`El sistema de puntuación es sobre 100: \n-Si completas el carton en 15 turnos obtendras la puntuación maxima. \n-En cualquier otro caso ira bajando. \n-Una puntuación superior a 20 se considera muy buena puntuación. \n-Llegar a la puntuacion maxima es improbable, pero NO imposible. \n-Tras simular 20.000 partidas el top 3 del ranking son 59, 51 y 49. \n ¡Mucha suerte!`)
    showRanking();
};
const startGame = () => {
    restartGame();
    newBingoCard();
    showUserCard();
};
const gameRound = () => {
    showUserCard();
    confirmKeepPlaying();
    checkBingoNumbers();
    markUserCardNumbers();
    checkLineAndBingo();
};
const getRanking = () => {
    if(user.prize.fullBingo == 15){
        ranking.memory.push({name : user.name, score: 100 - (((user.balls.bingoNumbers.length - 15)* 100)/75)});
        ranking.memory.sort((a,b) => a.score - b.score)
        ranking.final = [];
        for ( number in ranking.memory){
            ranking.final.unshift(ranking.memory[number].name + ' ==> ' + Math.round(ranking.memory[number].score) + '\n');
        };
        showRanking();
    };
};
const showRanking = () => {
    alert('Este es el ranking actual:\n' + (ranking.final).join(''));
}
const rePlay = () => {
    user.wannaPlay = confirm('¿Quieres volver a jugar?');
    if(rapidGame == false){
        rapidGame = confirm('¿Quieres activar el modo rapido? \n Solo apareceran los resultados de cada partida.');
    }if(user.wannaPlay == true){
        bingo();
    }else{
        return;
    };
};
const getUserName = () => {
    keepUserName();
    while (promptCheck(user.name) === undefined){
    user.name = prompt('Introduzca su nombre');
    };
    if (promptCheck(user.name) === false){
        user.wannaPlay = false;
    };
};
const keepUserName = () => {
    if((user.name) !== undefined){
     confirm('¿Seguir con el mismo usuario?') ? user.name  : user.name = undefined;
     user.wannaPlay = true
    };
};
const promptCheck = (it) => {
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
const restartGame = () => {
   return user.balls.bingoNumbers = [],
          user.card.bingoCard = [], 
          user.card.shownBingoCard = [];
};
const showUserCard = () => {
    getUserBingoCard ();
    makeUserBingoCardNice();
    showCardMarked();    
};
const getUserBingoCard = () => {
    if ( user.card.shownBingoCard.length < 15 ){
        for ( let i = 0 ; i < 15 ; i++){
        user.card.shownBingoCard.push(user.card.bingoCard[i].number);
        };
    };
};
const makeUserBingoCardNice = () => {
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
const showCardMarked = () => {
    if (!(user.balls.bingoNumbers.length == 0)){
        if(!rapidGame){
        user.balls.markNumber == false ?
        alert(`Este es su carton: \n| |${user.card.nicerBingoCard.join('| |')}`) :
        alert(`Este es su carton: \n| |${user.card.nicerBingoCard.join('| |')} \n Se ha marcado el numero |${user.balls.bingoNumbers[user.balls.bingoNumbers.length - 1]}|`);
        };
        user.balls.markNumber = false;
    };
};
const confirmKeepPlaying = () => {
    if(user.balls.bingoNumbers.length < 91  ){
        do {
            user.balls.actualNumber = getRandomNumber();
        }while (checkActualNumber());
        if(!rapidGame){
        user.wannaPlay = confirm(`Ha salido el numero: ${user.balls.actualNumber}. \n \n ¿Quieres seguir jugando?`);
        };
        if (!(promptCheck (user.wannaPlay))){
            return;
        }
        user.balls.bingoNumbers.push(user.balls.actualNumber);
    }else{
        confirm('No quedan mas bolas.');
    };
};
const checkActualNumber = () => {
    for (number in user.balls.bingoNumbers){
        if (user.balls.bingoNumbers[number] === user.balls.actualNumber){
            return true;
            break;
        };
    };
};
const checkBingoNumbers = () => {
    for (number in user.card.bingoCard){
        if (user.card.bingoCard[number].number === user.balls.actualNumber){
            user.balls.markNumber = true
            return user.card.bingoCard[number].matched = true;
            break;
        };
    };
};
const markUserCardNumbers = () => {
    for(number in user.card.bingoCard){
        if(user.card.bingoCard[number].matched){
            user.card.shownBingoCard[number] = ' X ';
        };
    };
};
const checkLineAndBingo = () => {
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
        alert(`¡BINGO! Felicidades has completado el cartón en ${user.balls.bingoNumbers.length} turnos.`);
        user.wannaPlay = false;
    };
};
const newBingoCard = () => {
    for ( let i = 0 ; i < 3 ; i++ ){
    newBingoCardLine();
    };
    user.card.bingoCard.sort((a,b) => a.number - b.number);
};
const checkBingoCard = () => {
    if ((user.balls.bingoNumbers.length == 0) ){
    user.acceptCard = confirm(`Este es su carton: \n| |${user.card.nicerBingoCard.join('| |')}\n\n Pulsa ACEPTAR para continuar o CANCELAR para generar uno nuevo.`); 
    return !user.acceptCard;
    };
};
const newBingoCardLine = () => {  
    for ( let i = 0 ; i < 5 ; i++ ){
        do {
            user.balls.actualNumber = getRandomNumber();
        }while (checkBingoCardNumber());
        user.card.bingoCard.push({number: user.balls.actualNumber, matched: false});
    };
    return;
};
const checkBingoCardNumber = () => {
    for (number in user.card.bingoCard){
        if (user.card.bingoCard[number].number === user.balls.actualNumber){
            return true;
            break;
        };
    };
};
const getRandomNumber = () => {
    do{
        randomNumber = Math.floor(Math.random() * 91 );
    }while(randomNumber == 0);
    if(randomNumber < 10){
        randomNumber = ('0').concat(randomNumber);
    };
    return randomNumber;
};
