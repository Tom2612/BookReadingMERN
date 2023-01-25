const mongoose = require('mongoose');

const getBooks = async (req, res) => {
    res.status(200).json({mssg: 'get all books'});
}

const getBook = async (req, res) => {
    res.send('get one book');
}

const createBook = async (req, res) => {
    res.send('create a book');
}

const updateBook = async (req, res) => {
    res.send('update a book');
}

const deleteBook = async (req, res) => {
    res.send('delete a book');
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}