'use strict';
var Mongoose = require('mongoose');

Mongoose.set('useCreateIndex', true);
Mongoose.set('useFindAndModify', false);

Mongoose.connect(process.env.EUCLIDEON_MONGO_URI, { useNewUrlParser: true, mongos: {ssl: true,sslValidate: false}, useUnifiedTopology: true }, function (err) {
if (err) {
    console.log("DB Error: ", err);
    process.exit(1);
} else {
    console.log('MongoDB Connected');
}
});

exports.Mongoose = Mongoose;