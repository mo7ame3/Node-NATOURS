// * Local Data From JSON
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

// ? Online Data from mongoose server

const Tour = require('./../models/tourModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// exports.getAllTours = catchAsync(async (req, res, next) => {
//   /*
//   // //? 1A) Filtering
//   const queryObject = { ...req.query };
//   const excludedFields = ['page', 'sort', 'limit', 'fields'];
//   excludedFields.forEach((el) => delete queryObject[el]);

//   // //? 2B) Advanced Filtering
//   let queryStr = JSON.stringify(queryObject);
//   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//   let query = Tour.find(JSON.parse(queryStr));

//   //* 2) Sorting
//   if (req.query.sort) {
//       console.log(req.query.sort); // Log the sort parameter
//       const sortBy = req.query.sort.split(',').join(' ');
//       query = query.sort(sortBy);
//   } else {
//       query = query.sort('-createdAt');
//   }

//   //* 3) Field Limiting
//   if (req.query.fields) {
//       const fields = req.query.fields.split(',').join(' ');
//       query = query.select(fields);
//   } else {
//       query = query.select('-__v');
//   }

//   //* 4) Pagination
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 100;
//   const skip = (page - 1) * limit;
//   query = query.skip(skip).limit(limit);
//   if (req.query.page) {
//       const numTours = await Tour.countDocuments();
//       if (skip >= numTours) throw new Error('This page does not exist');
//   }
//   //! Another way to query data
//    //* const query = Tour.find().where('duration')
//   //* .equals(5).where('difficulty').equals('easy');
//   */

//   // TODO Execute Query
//   const features = new APIFeatures(Tour.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   const tours = await features.query;

//   //! Send Response
//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });

// exports.createTour = catchAsync(async (req, res, next) => {
//   const newTour = await Tour.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     data: {
//       tour: newTour,
//     },
//   });
// });

// exports.getTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findById(req.params.id).populate('reviews');

//   //TODO Tour.findById(id)   is equal ---> Tour.findOne({_id: req.params.id})
//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   return res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     data: {
//       tour,
//     },
//   });
// });

// exports.updateTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   return res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     data: {
//       tour,
//     },
//   });
// });

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);
//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   return res.status(204).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     data: null,
//   });
// });

exports.deleteTour = factory.deleteOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.createTour = factory.createOne(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.getAllTours = factory.getAll(Tour);

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,-price';
  req.query.fields = 'name,price,ratingsAverage,difficulty,summary';
  next();
};

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 },
      },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        num: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        avgPrice: 1,
      },
    },
  ]);
  return res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: stats,
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
        month: 1,
        tours: 1,
      },
    },
    {
      $sort: {
        numTours: -1,
      },
    },
  ]);
  return res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: plan,
  });
});

exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    return next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng',
        400,
      ),
    );
  }
  const tours = await Tour.find({
    startLocation: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius],
      },
    },
  });
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
  if (!lat || !lng) {
    return next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng',
        400,
      ),
    );
  }
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [lng * 1, lat * 1] },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        name: 1,
        distance: 1,
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
