'use strict';

const Game = require('../modules/Game.class');
const game = new Game();
const button = document.querySelector('.button.start');
const messageWin = document.querySelector('.message-win');
const messageLose = document.querySelector('.message-lose');
const messageStart = document.querySelector('.message-start');
const gameScore = document.querySelector('.game-score');
const table = document.querySelector('.game-field tbody');

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
  if (game.getStatus() === 'lose' || game.getStatus() === 'idle') {
    return;
  }

  let isTriggered = true;

  switch (e.key) {
    case 'ArrowUp': {
      game.moveUp();
      break;
    }

    case 'ArrowDown': {
      game.moveDown();
      break;
    }

    case 'ArrowLeft': {
      game.moveLeft();
      break;
    }

    case 'ArrowRight': {
      game.moveRight();
      break;
    }

    default: {
      isTriggered = false;
      break;
    }
  }

  if (isTriggered) {
    renderBoard();
  }
});

function renderBoard() {
  const board = game.getState();

  for (let i = 0; i < game.size; i++) {
    for (let j = 0; j < game.size; j++) {
      const cell = table.rows[i].cells[j];
      const cellValue = board[i][j];

      cell.textContent = cellValue === 0 ? '' : cellValue;

      cell.className =
        cellValue === 0 ? 'field-cell' : `field-cell field-cell--${cellValue}`;
    }
  }

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
