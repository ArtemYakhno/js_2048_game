'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */

  #initialBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  #size = 4;

  constructor(initialState) {
    if (initialState) {
      this.#initialBoard = structuredClone(initialState);
    }
    this.board = structuredClone(this.#initialBoard);
    this.score = 0;
  }

  moveLeft() {}
  moveRight() {}
  moveUp() {}
  moveDown() {}

  /**
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.board;
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {
    if (this.#checkInitial()) {
      return 'idle';
    }

    return 'playing';
  }

  /**
   * Starts the game.
   */
  start() {
    this.#initGame();
  }

  /**
   * Resets the game.
   */
  restart() {
    this.board = structuredClone(this.#initialBoard);
    this.score = 0;
    this.#initGame();
  }

  #checkInitial() {
    return JSON.stringify(this.board) === JSON.stringify(this.#initialBoard);
  }

  #initGame() {
    this.#pushNumber();
    this.#pushNumber();
  }

  #pushNumber() {
    const indexRow = this.#generateRandomIndex(
      0,
      this.#size,
      this.#findEmptyRows(),
    );
    const indexCell = this.#generateRandomIndex(
      0,
      this.#size,
      this.#findEmptyCells(indexRow),
    );
    const value = this.#generateRandomNumber();

    this.board[indexRow][indexCell] = value;
  }

  #generateRandomIndex(min, max, excluded = []) {
    let num;

    do {
      num = Math.floor(Math.random() * (max - min)) + min;
    } while (!excluded.includes(num));

    return num;
  }

  #findEmptyRows() {
    return this.board
      .map((row, index) => {
        if (row.some((cell) => cell === 0)) {
          return index;
        }
      })
      .filter((el) => el !== undefined);
  }

  #findEmptyCells(indexRow) {
    return this.board[indexRow]
      .map((cell, index) => {
        if (cell === 0) {
          return index;
        }
      })
      .filter((el) => el !== undefined);
  }

  #generateRandomNumber() {
    const min = 0;
    const max = 100;
    // From 0% to 100%
    const randomInRange = Math.floor(Math.random() * (max - min + 1)) + min;

    if (randomInRange <= 10) {
      return 4;
    }

    return 2;
  }
}

module.exports = Game;
