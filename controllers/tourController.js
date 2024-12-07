// TODO Local Data From JSON
// const fs = require('fs');
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price in request body',
//         });
//     }
//     next();
// }
// exports.checkId = (req, res, next, val) => {
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID',
//         });
//     }
//     next();
// };
// exports.getAllTours = (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         data: {
//             count: tours.length,
//             tours: tours,
//         },
//     });
// };
// exports.createTour = (req, res) => {
//     const tourId = tours[tours.length - 1].id + 1;
//     const newTour = Object.assign({ id: tourId }, req.body);
//     tours.push(newTour);
//     fs.writeFile(
//         `${__dirname}/../dev-data/data/tours-simple.json`,
//         JSON.stringify(tours),
//         (err) => {
//             if (err)
//                 res.status(404).json({
//                     status: 'fail',
//                     message: err,
//                 });
//             res.status(201).json({
//                 status: 'success',
//                 requestedAt: req.requestTime,
//                 data: {
//                     tour: newTour,
//                 },
//             });
//         }
//     );
// };
// exports.getTour = (req, res) => {
//     const id = req.params.id * 1;
//     const tour = tours.find((el) => el.id === id);
//     return res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         data: {
//             tour,
//         },
//     });
// };
// exports.updateTour = (req, res) => {
//     return res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         tour: 'Tour updated',
//     });
// };
// exports.deleteTour = (req, res) => {
//     const id = req.params.id * 1;
//     tours.splice(id, 1);
//     fs.writeFile(
//         `${__dirname}/../dev-data/data/tours-simple.json`,
//         JSON.stringify(tours),
//         (err) => {
//             if (err)
//                 res.status(404).json({
//                     status: 'fail',
//                     message: err,
//                 });
//             res.status(204).json({
//                 status: 'success',
//                 data: null,
//             });
//         }
//     );
// };

// TODO Online Data from mongoose server

const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,

    });
};
exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                tour: newTour,
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    return res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
    });
};
exports.updateTour = (req, res) => {
    return res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        tour: 'Tour updated',
    });
};
exports.deleteTour = (req, res) => {

};
