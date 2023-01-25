const express = require('express');
const router = express.Router();
const { getBooks, getBook, createBook, updateBook, deleteBook } = require('../controllers/bookControllers.js');

// get all books
router.get('/', getBooks)

// get individual books
router.get('/:id', getBook)

// create a book
router.post('/', createBook)

// update a book
router.patch('/:id', updateBook)

// delete a book
router.delete('/:id', deleteBook)

module.exports = router;