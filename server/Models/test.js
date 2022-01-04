var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Contents Schema
var test = new Schema({
    msg: { type: String, trim: true, required: true},
    show: { type: Boolean, default: true  },
    qut: {type: Number, required:false},
    ops:[
        {
            yesoryes: {type: Boolean},
            date: { type: Date, default: Date.now },
        }
    ]
});

// module.exports = mongoose.model('test', test);
const tester = mongoose.model('test', test);
module.exports.test = tester;