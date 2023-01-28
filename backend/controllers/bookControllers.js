const mongoose = require('mongoose');
const Book = require('../models/bookModel');

const getBooks = async (req, res) => {
    // Only get by user_id
    const user_id = req.user._id;

    const books = await Book.find({ user_id }).sort({createdAt: -1});

    res.status(200).json(books);
}

const getBook = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such book'});
    }

    const book = await Book.findById(id);

    if (!book) {
        return res.status(404).json({error: 'No such book'});
    }

    res.status(200).json(book);
}

const createBook = async (req, res) => {
    const { title, rating, pages } = req.body;

    // error handler finding empty fields
    let emptyFields = [];
    if (!title) {
        emptyFields.push('title');
    }
    if (!pages) {
        emptyFields.push('pages');
    }
    if (!rating) {
        emptyFields.push('rating');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
    }

    try {
        const user_id = req.user._id;
        const book = await Book.create({ title, rating, pages, user_id });
        res.status(200).json(book);
    } catch(e) {
        res.status(404).json({error: e.message});
    }
}

const updateBook = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such book'});
    }

    const book = await Book.findOneAndUpdate({_id: id}, {...req.body});

    if(!book) {
        return res.status(404).json({error: 'No such book'});
    }

    res.status(200).json(book);
}

const deleteBook = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such book'});
    }

    const book = await Book.findOneAndDelete({_id: id});

    if(!book){
        return res.status(404).json({error: 'No such book'});
    }

    res.status(200).json(book);
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}