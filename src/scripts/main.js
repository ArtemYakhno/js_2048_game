'use strict';

const Game = require('../modules/Game.class');
const game = new Game();
const button = document.querySelector('.button.start');
const messageWin = document.querySelector('.message-win');
const messageLose = document.querySelector('.message-lose');
const messageStart = document.querySelector('.message-start');
const gameScore = document.querySelector('.game-score');

button.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    showRestartButton();
    game.start();
  } else {
    game.restart();
  }
  renderBoard();
});

document.addEventListener('keydown', (e) => {
  if (game.getStatus() === 'lose') {
    return;
  }

  let isTriggered = false;

  switch (e.key) {
    case 'ArrowUp': {
      isTriggered = game.moveUp();
      break;
    }

    case 'ArrowDown': {
      isTriggered = game.moveDown();
      break;
    }

    case 'ArrowLeft': {
      isTriggered = game.moveLeft();
      break;
    }

    case 'ArrowRight': {
      isTriggered = game.moveRight();
      break;
    }

    default: {
      break;
    }
  }

  if (isTriggered) {
    renderBoard();
  }
});

function renderBoard() {
  gameScore.textContent = game.getScore();
  updateMessage();
}

function showRestartButton() {
  messageStart.classList.add('hidden');
  button.classList.remove('start');
  button.classList.add('restart');
  button.textContent = 'Restart';
}

function updateMessage() {
  const gameStatus = game.getStatus();

  messageStart.classList.toggle('hidden', gameStatus !== 'idle');
  messageWin.classList.toggle('hidden', gameStatus !== 'win');
  messageLose.classList.toggle('hidden', gameStatus !== 'lose');
}
