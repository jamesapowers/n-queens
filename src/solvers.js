/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var board = new Board( {n: n} );
  var matrix = board.rows();
  var inner = function(row, invalid) {
    if (n === row) {
      return;
    }
    for (var i = 0; i < matrix[row].length; i++) {
      if (!invalid[i]) {
        matrix[row][i] = 1;
        invalid[i] = 1;
        return inner(row + 1, invalid);
      }
    }
  };
  inner(0, {});
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix));
  return matrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board( {n: n} );
  var matrix = board.rows();
  debugger;
  var inner = function(row, invalid, temp) {
    if (n === row) {
      solutionCount = solutionCount + 1;
      return solutionCount;
    }
    if (typeof(temp) === 'number') {
      invalid[temp] = 1;
    }
    for (var i = 0; i < matrix[row].length; i++) {
      if (!invalid[i]) {
        return solutionCount += inner(row + 1, invalid, i);
      }
    }
  };
  return inner(0, {});

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
