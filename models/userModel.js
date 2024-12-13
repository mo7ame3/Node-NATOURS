const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
        maxLength: [50, 'Name must have less or equal than 50 characters'],
        minLength: [2, 'Name must have more or equal than 2 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
        minLength: [8, 'Password must have more or equal than 8 characters'],
        select: false, // This will exclude the password field by default
    },
    passwordConfirmation: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: 'Passwords do not match',
        },
        select: false,
    },
    photo: String,
    passwordChangeAt: Date,
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user',
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// TODO encrypt the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hashSync(this.password, 12);
    this.passwordConfirmation = undefined;
    next();
});

userSchema.methods.correctPassword = async function (condiatedPassword, userPassword) {
    return await bcrypt.compare(condiatedPassword, userPassword);
};

userSchema.methods.changePassword = async function (JWTTimestamp) {
    if (this.passwordChangeAt) {
        console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
        const changeTimestamp = ParseInt(this.passwordChangeAt.getTime() / 1000, 10);
        return JWTTimestamp < changeTimestamp;
    }
    return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;