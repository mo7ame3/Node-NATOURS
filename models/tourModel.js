const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
    },
    duration: Number,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
    },
    maxGroupSize: Number,
    difficulty: String,
    ratingsAverage: Number,
    ratingsQuantity: Number,
    summary: String,
    description: String,
    imageCover: String,
    images: [String],
    startDates: [String],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
