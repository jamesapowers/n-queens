// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },
    
    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    transposeMatrix: function(matrix) {
      var newMatrix = [];
      for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
          if (i === 0) {
            newMatrix.push([]);
          }
          newMatrix[j].push(matrix[i][j]);
        }
      }
      return newMatrix;
    },



    //      _             _     _
    //  ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    // / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    // \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    // |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
 
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count = 0;
      for (var i = 0; i < rowIndex.length; i++) {
        if (rowIndex[i] === 1) {
          count++;
        }
      }
      return count > 1; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var matrix = this.rows(); //
      for (var i = 0; i < matrix.length; i++) {
        if (this.hasRowConflictAt(matrix[i])) { 
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0;
      for (var i = 0; i < colIndex.length; i++) {
        if (colIndex[i] === 1) {
          count++;
        }
      }
      return count > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var matrix = this.rows();
      var invalid = {};
      // var newMatrix = this.transposeMatrix(matrix);
      // for (var k = 0; k < newMatrix.length; k++) {
      //   if (this.hasColConflictAt(newMatrix[k])) {
      //     return true;
      //   }
      // }
      // return false; // fixme
      
      for (var row = 0; row < matrix.length; row++) {
        for (var col = 0; col < matrix[row].length; col++) {
          if (matrix[row][col] === 1) {
            if (invalid[col]) {
              return true;
            }
            invalid[col] = 1;
          }
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      for (var i = 0; i < majorDiagonalColumnIndexAtFirstRow.length; i++) {
        if (majorDiagonalColumnIndexAtFirstRow[i] === 1) {
          count++;
        }
      }
      return count > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var matrix = this.rows();
      var newMatrix = [];
      for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
          var diagonalArr = [];
          var col = j;
          var row = i;
          while (col < matrix.length && row < matrix.length) {
            diagonalArr.push(matrix[col][row]);
            row++;
            col++;
          }
          newMatrix.push(diagonalArr); 
        }
      }
      for (var k = 0; k < newMatrix.length; k++) {
        if (this.hasMajorDiagonalConflictAt(newMatrix[k])) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      for (var i = 0; i < minorDiagonalColumnIndexAtFirstRow.length; i++) {
        if (minorDiagonalColumnIndexAtFirstRow[i] === 1) {
          count++;
        }
      }
      return count > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var matrix = this.rows();
      var newMatrix = [];
      for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
          var diagonalArr = [];
          var col = j;
          var row = i;
          while (col < matrix.length && row >= 0) {
            diagonalArr.push(matrix[col][row]);
            row--;
            col++;
          }
          newMatrix.push(diagonalArr); 
        }
      }
      for (var k = 0; k < newMatrix.length; k++) {
        if (this.hasMinorDiagonalConflictAt(newMatrix[k])) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
