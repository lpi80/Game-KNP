'use strict';
var game = {
  countPaperNumber: 0,
  countScisorsNumber: 0,
  countStoneNumber: 0,
  moveComputer: 0,
  humanMoveInfo: '',
  computerMoveInfo: '',
  resultOneGame: 0,
  resultOneGameInfo: '',
  moveHuman: 0,
  gameLimit: 0,
  computerResult: 0,
  humanResult: 0,
  numberOfChoice: 2,
  table: []
}

var documentObjects = {
  info: document.querySelector('#result'),
  infoFinish: document.querySelector('#gameResult'),
  computer: document.querySelector('#box-computer'),
  human: document.querySelector('#box-human'),
  newGame: document.querySelector('#new-game'),
  stone: document.querySelector('#box-stone'),
  scisors: document.querySelector('#box-scisors'),
  paper: document.querySelector('#box-paper'),
  move: document.querySelectorAll('.player-move')
}

function removeRow() {
  const myTab = document.getElementById('myTable');
  while (myTab.rows.length > 0) {
    myTab.deleteRow(0);
  }
  for (let a in game.table) {
    if (a = 'lp') {
      game.table[a] = 0;
    } else {
      game.table(a) = '';
    }
  }
  
}
function addRow() {
  const myTab = document.getElementById('myTable');
  const rowCnt = myTab.rows.length;      
  let tr = myTab.insertRow(rowCnt);   
  let k = 0;
  for (let c in game.table) {
    let td = document.createElement('td');       
    td = tr.insertCell(k);
    k++;
    td.innerHTML = game.table[c];
  }
}



const playerMove = function (__move) {
  //Change number to string - information about move
  if (!(game.table['lp'] >= 0)) {game.table['lp'] = 0;}
  game.table['lp'] = game.table['lp'] + 1;
  
  
  var moveInfo = function (__moveInfo) {
    switch (__moveInfo) {
      case 1: return 'Papier';
      case 2: return 'Kamień';
      case 3: return 'Nożyce';
      default: return 'Brak ruchu'
    }
  }

  //Count move result
  const moveResult = function (__moveHuman, __moveComputer) {
    if (__moveHuman === __moveComputer) {
      return 0; //Draw 
    }
    else if ((__moveComputer - __moveHuman == 1) || (__moveHuman - __moveComputer == game.numberOfChoice)) {
      return 1; //Human won  
    }
    else return 2; //Computer won
  }

  const moveResultInfo = function (__moveResult) {
    switch (__moveResult) {
      case 0: return 'Remis';
      case 1: return 'Wygrałeś';
      case 2: return 'Przegrałeś';
      default: return 'Zapraszam do gry';
    }
  }

  //count computer move
  const countMoveComputer = function () {
    return Math.round(Math.random() * game.numberOfChoice + 1);
  }

  game.moveHuman = __move;
  game.humanMoveInfo = moveInfo(__move);
  game.moveComputer = countMoveComputer();
  game.computerMoveInfo = moveInfo(game.moveComputer);
  game.resultOneGame = moveResult(__move, game.moveComputer);
  game.resultOneGameInfo = moveResultInfo(game.resultOneGame);

  game.table['human'] = game.humanMoveInfo;
  game.table['computer'] = game.computerMoveInfo;

  if (game.resultOneGame == 0) {
    game.table['result'] = 'remis';
  }
  if (game.resultOneGame == 1) {
    game.table['result'] = 'Człowiek';
    documentObjects.human.querySelector('p').innerHTML = ++game.humanResult;
    if (game.humanResult == game.gameLimit) {
      openModal('#gameResult');
      documentObjects.infoFinish.querySelector('.game__header--desc').classList.add('info--finish');
      documentObjects.infoFinish.querySelector('.game__header--result').innerText = 'Wygrałeś całą grę';
    }
  }
  if (game.resultOneGame == 2) {
    game.table['result'] = 'Komputer';
    documentObjects.computer.querySelector('p').innerHTML = ++game.computerResult;
    if (game.computerResult == game.gameLimit) {
      openModal('#gameResult');
      documentObjects.infoFinish.querySelector('.game__header--desc').classList.add('info--red');
      documentObjects.infoFinish.querySelector('.game__header--result').innerText = 'Przegrałeś całą grę';
    }
  }
  game.table['resultProgres'] = '' + game.humanResult + ':' + game.computerResult;
  addRow();
}

//**********************************************************************************************************************

const gameDesc = function () {
  return game.resultOneGameInfo + '!<br>Człowiek: ' + game.humanMoveInfo + '<br>Komputer: ' + game.computerMoveInfo;
}

const checkResult = function () {
  return ((game.computerResult < game.gameLimit) && (game.humanResult < game.gameLimit)) ? 1 : 0;
}

documentObjects.move.forEach(function (kind) {
  kind.addEventListener('click', function (event) {
    if (checkResult() == 1) {
      let counter;
      let number;
      switch (kind.attributes["data-move"].nodeValue) {
        case 'scisor':
          number = 3;
          ++game.countScisorsNumber;
          counter = game.countScisorsNumber;
          break;
        case 'stone':
          number = 2;
          ++game.countStoneNumber;
          counter = game.countStoneNumber;
          break;
        case 'paper':
          number = 1;
          ++game.countPaperNumber;
          counter = game.countPaperNumber;
          break;
      }
      kind.parentElement.querySelector('p').innerHTML = '' + counter;
      playerMove(number);
      documentObjects.info.innerHTML = gameDesc();
    }
  });
})


const buttonClickCallbackNewGame = function (event) {
  //check number
  const check = function (input) {
    return (isNaN(input) || (input === null) || (input === '') || (input < 1)) ? 0 : 1;
  }

  game.gameLimit = window.prompt('Do ilu wygranych gramy?');
  if (check(game.gameLimit) == 1) {
    documentObjects.newGame.querySelector('p').innerHTML = game.gameLimit;
    game.computerResult = 0;
    game.humanResult = 0;
    game.countScisorsNumber = 0;
    game.countStoneNumber = 0;
    game.countPaperNumber = 0;
    removeRow();
    documentObjects.human.querySelector('p').innerHTML = game.humanResult;
    documentObjects.computer.querySelector('p').innerHTML = game.computerResult;
    documentObjects.scisors.querySelector('p').innerHTML = '' + game.countScisorsNumber;
    documentObjects.stone.querySelector('p').innerHTML = '' + game.countStoneNumber;
    documentObjects.paper.querySelector('p').innerHTML = '' + game.countPaperNumber;
  }
  else buttonClickCallbackNewGame();
}


documentObjects.newGame.addEventListener('click', buttonClickCallbackNewGame);