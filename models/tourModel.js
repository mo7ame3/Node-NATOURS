const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        maxLength: [40, 'A tour must have less or equal than 40 characters'],
        minLength: [10, 'A tour must have more or equal than 10 characters'],
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration'],
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        default: 1,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size'],
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty must be either easy, medium, or difficult',
        }
    },
    ratingsAverage: Number,
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    summary: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description'],
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    startDates: [String],
    priceDiscount: {
        type: Number,
        validate: function (value) {
            return value < this.price
        },
        message: 'Discount price ({VALUE}) should be below regular price',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    startDates: [Date]
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });


tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
