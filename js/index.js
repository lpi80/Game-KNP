'use strict';
let game = {
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
  gameHumanName: 'Człowiek',
  table: []
}

const documentObjects = {
  info: document.querySelector('#result'),
  infoFinish: document.querySelector('#gameResult'),
  computer: document.querySelector('#box-computer'),
  human: document.querySelector('#box-human'),
  newGame: document.querySelector('#new-game'),
  stone: document.querySelector('#box-stone'),
  scisors: document.querySelector('#box-scisors'),
  paper: document.querySelector('#box-paper'),
  move: document.querySelectorAll('.player-move'),
  newGameConfirmation: document.querySelector('#loginForm button')
}

function removeRow() {
  const myTab = document.getElementById('myTable');
  while (myTab.rows.length > 0) {
    myTab.deleteRow(0);
  }
  for (let key in game.table) {
    if (key = 'lp') {
      game.table[key] = 0;
    } else {
      game.table(key) = '';
    }
  }
}

function addRow() {
  const myTab = document.getElementById('myTable');
  const rowCnt = myTab.rows.length;      
  let tr = myTab.insertRow(rowCnt);   
  let j = 0;
  for (let i in game.table) {
    let td = document.createElement('td');       
    td = tr.insertCell(j);
    j++;
    td.innerHTML = game.table[i];
  }
}

const playerMove = function (__move) {
  //Change number to string - information about move
  if (!(game.table['lp'] >= 0)) {game.table['lp'] = 0;}
  game.table['lp'] = game.table['lp'] + 1;
  
  
  const moveInfo = function (__moveInfo) {
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

  switch (game.resultOneGame) {
    case 0:
      game.table['result'] = 'remis';
      break;

    case 1:
      game.table['result'] = game.gameHumanName;
      documentObjects.human.querySelector('p').innerHTML = ++game.humanResult;
      if (game.humanResult == game.gameLimit) {
        openModal('#gameResult');
        documentObjects.infoFinish.querySelector('.game__header--desc').classList.add('info--finish');
        documentObjects.infoFinish.querySelector('.game__header--result').innerText = 'Wygrałeś całą grę';
      }
      break;

    case 2:
      game.table['result'] = 'Komputer';
      documentObjects.computer.querySelector('p').innerHTML = ++game.computerResult;
      if (game.computerResult == game.gameLimit) {
        openModal('#gameResult');
        documentObjects.infoFinish.querySelector('.game__header--desc').classList.add('info--red');
        documentObjects.infoFinish.querySelector('.game__header--result').innerText = 'Przegrałeś całą grę';
      }
      break
  }
  game.table['resultProgres'] = '' + game.humanResult + ':' + game.computerResult;
  addRow();
}

//**********************************************************************************************************************

const gameDesc = function () {
  return game.resultOneGameInfo + '!<br>' + game.gameHumanName + ': ' + game.humanMoveInfo + '<br>Komputer: ' + game.computerMoveInfo;
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
  
  document.querySelector('#gameNumber').valueAsNumber = '';
  document.querySelector('#gameName').value = '';
  
  openModal('#modalLogin');
}

const check = function (input) {
  return (isNaN(input) || (input === null) || (input === '') || (input < 1)) ? 0 : 1;
}

documentObjects.newGame.addEventListener('click', buttonClickCallbackNewGame);

documentObjects.newGameConfirmation.addEventListener('click', function(event) {
  game.gameLimit = document.querySelector('#gameNumber').valueAsNumber;
  game.gameHumanName = document.querySelector('#gameName').value;
  document.querySelector('#gameResult .game__header--desc').innerText = game.gameHumanName;
  document.querySelector('#box-human .box__header').innerText = game.gameHumanName;
  document.querySelector('#humanMoveDesc').innerText = 'Ruch ' + game.gameHumanName;
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
});