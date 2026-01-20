const router = require('express').Router()

const { Board } = require('../models')

// Middleware
// Retrieve board from database and place it in the "board" property of the req object
const boardFinder = async (req, res, next) => {
    req.board = await Board.findByPk(req.params.id).catch((err) => {
        console.log(err)
        res.status(400).json({ error: 'Invalid board id' })
    })
    next()
}

router.get('/', async (req, res) => {
    const boards = await Board.findAll()
    res.json(boards)
})

router.post('/', async (req, res) => {
    try {
        const board = Board.build(req.body)
        await board.save()
        res.json(board)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.get('/:id', boardFinder, async (req, res) => {
    if (req.board) {
        res.json(req.board)
    } else {
        res.status(404).end()
    }
})

router.delete('/:id', boardFinder, async (req, res) => {
    if (req.board) {
        await req.board.destroy()
    }
    res.status(204).end()
})

router.put('/:id', boardFinder, async (req, res) => {
    if (req.board) {
        req.board.content = req.body.content // Only modification of content so far
        await req.board.save()
        res.json(req.board)
    } else {
        res.status(404).end()
    }
})

module.exports = router