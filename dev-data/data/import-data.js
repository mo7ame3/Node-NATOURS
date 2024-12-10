const fs = require('fs');
const Tour = require('./../../models/tourModel');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './../../config.env' });
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log('DB connection successful!');
    })
    .catch((err) => {
        console.log('Database connection error:  ' + err);
    });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded');
        process.exit();
    }
    catch (err) {
        console.error('Error while importing data', err);
    }
}

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    }
    catch (err) {
        console.error('Error while deleting data', err);
    }
}

if (process.argv[2] === '--import') {
    importData();
}
else if (process.argv[2] === '--delete') {
    deleteData();
}
