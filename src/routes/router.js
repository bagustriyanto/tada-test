const router = require("express").Router()
const sudokuController = require("../modules/sudoku/sudokuController")

router.get("/sudoku", sudokuController.sudokuPuzzle)

module.exports = router
