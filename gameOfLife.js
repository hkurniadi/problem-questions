/* Leetcode Question: https://leetcode.com/problems/game-of-life/
According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1) or dead (represented by a 0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

Any live cell with fewer than two live neighbors dies as if caused by under-population.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by over-population.
Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously. Given the current state of the m x n grid board, return the next state.


Constraints

m == board.length i.e. m is the board row
n == board[i].length i.e. n is the board column
1 <= m, n <= 25
board[i][j] is 0 or 1.

Examples
Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]

Input: board = [[1,1],[1,0]]
Output: [[1,1],[1,1]]
*/

/* Draft Algorithms

1. Group certain sections that will be handled differently to define neighbours

a. Cells that only have 3 neighbours i.e. corner cells
First column first row i.e. board[0][0]
First column last row i.e. board[m-1][0]
Last column first row i.e. board[0][n-1]
Last column last row i.e. board[m-1][n-1]

b. Cells that only have 5 neighbours 
First row, not first column AND not last column i.e. board[0][1 to (n-2)]
Last row, not first column AND not last column i.e. board[m-1][1 to (n-2)]
First column, not first row AND not last row
Last column, not first row AND not last row

c. Cells that will die for sure regardless of the current state because cell only has 1 neighbour
Only one row, first column
Only one row, last column
Only one column, first row
Only one column, last row
Only one cell i.e. one row one column i.e. board[0][0]

2. For each group in #1, check the appropriate surrounding cells and apply the rules

3. Push the resulting value from #2 into the returned array

*/

/* Helper functions for each live condition */
function hasFewerThanTwoLiveNeighbours(cellNeighbours) {
  let countOfOnes = 0;
  cellNeighbours.forEach((value) => {
    if (value === 1) {
      countOfOnes++;
    }
  })

  if (countOfOnes < 2) {
    return true
  } else {
    return false
  }
}

function hasTwoOrThreeLiveNeighbours(cellNeighbours) {
  let countOfOnes = 0;
  cellNeighbours.forEach((value) => {
    if (value === 1) {
      countOfOnes++;
    }
  })

  if (countOfOnes === 2 || countOfOnes === 3) {
    return true
  } else {
    return false
  }
}

function hasMoreThanThreeLiveNeighbours(cellNeighbours) {
  let countOfOnes = 0;
  cellNeighbours.forEach((value) => {
    if (value === 1) {
      countOfOnes++;
    }
  })

  if (countOfOnes > 3) {
    return true
  } else {
    return false
  }
}

function hasExactlyThreeLiveNeighbours(cellNeighbours){
  let countOfOnes = 0;
  cellNeighbours.forEach((value) => {
    if (value === 1) {
      countOfOnes++;
    }
  })

  if (countOfOnes === 3) {
    return true
  } else {
    return false
  }
}

function cellNextState(cellValue, cellNeighbours) {
  if (cellValue === 1) {
    if (hasFewerThanTwoLiveNeighbours(cellNeighbours) || hasMoreThanThreeLiveNeighbours(cellNeighbours)) { // Live cell dies
      return 0
    } else if (hasTwoOrThreeLiveNeighbours(cellNeighbours)) { // Live cell stays alive
      return 1
    }
  } else if (cellValue === 0) {
    if (hasExactlyThreeLiveNeighbours(cellNeighbours)) { // Dead cell becomes alive
      return 1
    } else { // Dead cell stays dead
      return 0
    }
  } else {
    console.log("Not a valid cell value");
    return
  }
}

/* Actual function */
/* TODO: implement group c in the Algorithm */
function gameOfLife(board) {
  // Check the number of rows, and the number of columns
  console.log("Current Board State", board);
  let m = board.length; // number of rows
  // console.log("m = ", m);
  let n; // number of columns
  
  // Check for board size constraints 1 <= m, n <= 25
  if (m < 1) {
    console.log("Board size is not within constraint");
    return
  } else {
    n = board[0].length // number of columns
    // console.log("n = ", n)

    if (n > 25) {
      console.log("Board size is not within constraint");
      return
    } else if (n === 0) {
      console.log("Board is empty");
      return
    }
  }
  
  let boardNextState = []; // to store the next state of the cells that will be returned

  for (let row = 0; row <= m-1; row++) {
    let rowNextState = []; // to store the next state of each row
    if (row === 0) { //First row of the board
      // console.log("this is first row", board[row]);
      for (let column = 0; column <= n-1; column++) {
        // TODO: other alternative might be to use Map to store the neighbours
        // TODO: put these logic into a separate function
        let neighbours = [];
        let cellNextStateValue;

        if (column === 0) { // First row, first column
          neighbours.push(board[row][column+1]); // The cell value in the right
          neighbours.push(board[row+1][column+1]); // the cell value in the bottom right diagonal
          neighbours.push(board[row+1][column]); //The cell value below
        } else if (column !== 0 && column !== n-1) { // Any columns in between
          neighbours.push(board[row][column+1]); // The cell value in the right
          neighbours.push(board[row+1][column+1]); // The cell value in the bottom right diagonal
          neighbours.push(board[row+1][column]); // The cell value right below
          neighbours.push(board[row+1][column-1]); // The cell value in the bottom left diagonal
          neighbours.push(board[row][column-1]); // The cell value in the left
        } else if (column === n-1) { // First row, last column
          neighbours.push(board[row][column-1]); // The cell value in the left
          neighbours.push(board[row+1][column-1]); // The cell value in the bottom left diagonal
          neighbours.push(board[row+1][column]); // The cell value right below
        }

        // console.log("Current cell value", board[row][column]);
        // console.log("Neighbours", neighbours);
        cellNextStateValue = cellNextState(board[row][column], neighbours);
        // console.log("Next Cell State Value", cellNextStateValue);
        rowNextState.push(cellNextStateValue);
      }
    } else if (row !== 0 && row !== m-1) { // Rows in between in the board
      // console.log("row number", row+1, ":", board[row]);
      for (let column = 0; column <= n-1; column++) {
        // TODO: other alternative might be to use Map to store the neighbours
        // TODO: put these logic into a separate function
        let neighbours = [];
        let cellNextStateValue;

        if (column === 0) { // first column in the row
          neighbours.push(board[row-1][column]); // The cell value above
          neighbours.push(board[row-1][column+1]); // The cell value in the top right diagonal
          neighbours.push(board[row][column+1]); // The cell value in the right
          neighbours.push(board[row+1][column+1]); // The cell value in the bottom right diagonal
          neighbours.push(board[row+1][column]); // The cell value below
        } else if (column !== 0 && column !== n-1) { // any columns in between in the row
          neighbours.push(board[row-1][column]); // The cell value above
          neighbours.push(board[row-1][column+1]); // The cell value in the top right diagonal
          neighbours.push(board[row][column+1]); // The cell value in the right
          neighbours.push(board[row+1][column+1]); // The cell value in the bottom right diagonal
          neighbours.push(board[row+1][column]); // The cell value below
          neighbours.push(board[row+1][column-1]); // The cell value in the bottom left diagonal
          neighbours.push(board[row][column-1]); // The cell value in the left
          neighbours.push(board[row-1][column-1]); // The cell value in the top left diagonal
        } else if (column === n-1) { // last column in the row
          neighbours.push(board[row-1][column]); // The cell value above
          neighbours.push(board[row-1][column-1]); // The cell value in the top left diagonal
          neighbours.push(board[row][column-1]); // The cell value in the left
          neighbours.push(board[row+1][column-1]); // The cell value in the bottom left diagonal
          neighbours.push(board[row+1][column]); // The cell value below
        }

        // console.log("Current cell value", board[row][column]);
        // console.log("Neighbours", neighbours);
        cellNextStateValue = cellNextState(board[row][column], neighbours);
        // console.log("Next Cell State Value", cellNextStateValue);
        rowNextState.push(cellNextStateValue);
      }
    } else if (row === m-1) { // Last row of the board
      // console.log("this is last row", board[row]);
      for (let column = 0; column <= n-1; column++) {
        // TODO: other alternative might be to use Map to store the neighbours
        // TODO: put these logic into a separate function
        let neighbours = [];
        let cellNextStateValue;

        if (column === 0) { // Last row, first column
          neighbours.push(board[row][column+1]); // The cell value in the next column in the same row
          neighbours.push(board[row-1][column]); // The cell value above
          neighbours.push(board[row-1][column+1]); // The cell value in the top right diagonal
        } else if (column !== 0 && column !== n-1) { // Last row, any columns in between
          neighbours.push(board[row][column-1]); // The cell value in the previous column in the same row
          neighbours.push(board[row][column+1]); // The cell value in the next column in the same row
          neighbours.push(board[row-1][column-1]); // The cell value in the top left diagonal
          neighbours.push(board[row-1][column]); // The cell value right above
          neighbours.push(board[row-1][column+1]); // The cell value in the top right diagonal
        } else if (column === n-1) { // Last row, last column
          neighbours.push(board[row][column-1]); // The cell value in the previous column in the same row
          neighbours.push(board[row-1][column-1]); // The cell value in the top left diagonal
          neighbours.push(board[row-1][column]); // The cell value right above
        }

        // console.log("Current cell value", board[row][column]);
        // console.log("Neighbours", neighbours);
        cellNextStateValue = cellNextState(board[row][column], neighbours);
        // console.log("Next Cell State Value", cellNextStateValue);
        rowNextState.push(cellNextStateValue);
      }
    }
    // console.log("Row next state", rowNextState);
    boardNextState.push(rowNextState);
  }
  
  console.log("Next state of the Board", boardNextState);
  return boardNextState
}

/* Test run */
// gameOfLife([[0,1,0],[0,0,1],[1,1,1],[0,0,0]]);
// gameOfLife([[1,1],[1,0]]);
// gameOfLife([[0]]);