// var express = require('express');
// var router = express.Router();

const mongoose = require('mongoose');
const dbConnect = require('./../database/database');

let testSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    portfolioName: { type: String, required: true },
    tokenTicker: { type: String, required: true },
    tokenName: { type: String, required: true },
    tokenAmount: { type: Number, required: true }
});
let Post = mongoose.model('Post', testSchema);

module.exports = Post;