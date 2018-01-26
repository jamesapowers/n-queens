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
  
  var inner = function(row, invalid, temp) {
    
    if (n === row) {
      solutionCount = solutionCount + 1;
      return;
    }
    if (typeof(temp) === 'number') {
      invalid[temp] = 1;
    }
    for (var i = 0; i < matrix[row].length; i++) {
      if (!invalid[i]) {
        inner(row + 1, invalid, i);
        delete invalid[i];
      }
    }
  };
  
  inner(0, {});

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board( {n: n} );
  var matrix = board.rows();
  var foundSolution = false;
  var inner = function(row, invalidStraight, invalidLeft, invalidRight) {
    if (n === row) {
      foundSolution = true;
      return;
    }
    
    for (var i = 0; i < matrix[row].length; i++) {
      if (!invalidStraight[i] && !invalidLeft[i] && !invalidRight[i]) {
        var newInvalidLeft = {};
        var newInvalidRight = {};
        
        matrix[row][i] = 1;
        
        for (var leftKey in invalidLeft) {
          newInvalidLeft[Number(leftKey) - 1] = 1;
        }
        for (var rightKey in invalidRight) {
          newInvalidRight[Number(rightKey) + 1] = 1;
        }
        
        invalidStraight[i] = 1;
        newInvalidLeft[i - 1] = 1;
        newInvalidRight[i + 1] = 1;        
        
        inner(row + 1, invalidStraight, newInvalidLeft, newInvalidRight, i);
        
        delete invalidStraight[i];
        if (foundSolution) {
          return;
        }
        matrix[row][i] = 0;
      }
    }
  };
  inner(0, {}, {}, {});
  return matrix;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board( {n: n} );
  var matrix = board.rows();
  var solutionCount = 0;
  
  var inner = function(row, invalidStraight, invalidLeft, invalidRight) {
    
    if (n === row) {
      solutionCount++;
      return;
    }
    
    for (var i = 0; i < matrix[row].length; i++) {
      if (!invalidStraight[i] && !invalidLeft[i] && !invalidRight[i]) {
        var newInvalidLeft = {};
        var newInvalidRight = {};
        
        for (var leftKey in invalidLeft) {
          newInvalidLeft[Number(leftKey) - 1] = 1;
        }
        for (var rightKey in invalidRight) {
          newInvalidRight[Number(rightKey) + 1] = 1;
        }
        
        invalidStraight[i] = 1;
        newInvalidLeft[i - 1] = 1;
        newInvalidRight[i + 1] = 1;        
        
        inner(row + 1, invalidStraight, newInvalidLeft, newInvalidRight, i);
        
        delete invalidStraight[i];
      }
    }
  };
  inner(0, {}, {}, {});
  return solutionCount;
};
