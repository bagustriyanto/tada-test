const status = require("http-status")

function solveSudoku(board, boardLength) {
	let num = 0
	let result = true

	board.map(function(item, rowIndex) {
		item.map(function(childItem, colIndex) {
			num = board[rowIndex][colIndex]
			if (!isSafe(board, rowIndex, colIndex, num)) {
				result = false
			}
		})
	})
	return result
}

function isSafe(board, row, col, num) {
	// check unique row
	for (colIndex = 0; colIndex < board.length; colIndex++) {
		if (colIndex !== col) {
			// console.log({ step: "row check", row: row, col: colIndex, valueCheck: num })
			if (board[row][colIndex] === num) {
				throw Error(`number duplicate: ${num}. index[${row}][${col}] == index[${row}][${colIndex}]`)
			}
		}
	}

	// check unique col
	for (rowIndex = 0; rowIndex < board.length; rowIndex++) {
		if (rowIndex !== row) {
			if (board[rowIndex][col] === num) {
				throw Error(`number duplicate: ${num}. index[${row}][${col}] == index[${rowIndex}][${col}]`)
			}
		}
	}

	// check unique 3x3 box
	let sqrt = Math.sqrt(board.length)
	let rowStart = row - (row % sqrt)
	let colStart = col - (col % sqrt)
	let rowStartCounter = rowStart + sqrt
	let colStartCounter = colStart + sqrt

	for (rowIndex = rowStart; rowIndex < rowStartCounter; rowIndex++) {
		for (colIndex = colStart; colIndex < colStartCounter; colIndex++) {
			if (rowIndex !== row && colIndex !== col) {
				if (board[rowIndex][colIndex] === num) {
					throw Error(`number duplicate: ${num}. index[${row}][${col}] == index[${rowIndex}][${col}]`)
				}
			}
		}
	}

	return true
}

module.exports = {
	sudokuPuzzle(req, res) {
		let sudokuBoard = [
			[5, 3, 2, 9, 8, 6, 7, 4, 1],
			[4, 8, 7, 2, 1, 5, 3, 6, 9],
			[6, 9, 1, 4, 3, 7, 5, 8, 2],
			[3, 2, 5, 1, 7, 4, 8, 9, 6],
			[7, 6, 4, 3, 9, 8, 1, 2, 5],
			[8, 1, 9, 5, 6, 2, 4, 3, 7],
			[1, 5, 6, 8, 2, 3, 9, 7, 4],
			[9, 7, 8, 6, 4, 1, 2, 5, 3],
			[2, 4, 3, 7, 5, 9, 6, 1, 8]
		]

		let sudokuBoardLength = sudokuBoard.length

		let result = solveSudoku(sudokuBoard, sudokuBoardLength)

		res.status(status.OK).json(result)
	}
}
