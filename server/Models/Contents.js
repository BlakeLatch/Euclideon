// const { Int32, Double } = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Contents Schema
var contents = new Schema({
    type : { type: String , trim : true , required : true},
    name: { type: String , trim : true , required : true},
    icon: { type: String, trim: true, required: true },
    position:[
        {
            _id: false,
            coordinates: { type: [Number], default: [0, 0], required : true},
            height: { type: Number, trim: true, default: 20, required : true},
        }
    ],
    imgs:[
        {
            _id: false,
            imgSrc: { type: String, trim: true, default:'https://maxmaraliving.com.au/wp-content/uploads/2017/05/ef3-placeholder-image.jpg'},
            picSrc: { type: String, trim: true, default:'https://maxmaraliving.com.au/wp-content/uploads/2017/05/ef3-placeholder-image.jpg'},
        }
    ],
    link: { type: String, trim: true, required: true },
    desc: { type: String, trim: true },
    show: { type: Boolean, default: true },
    addedDate: {type: Date, default: Date.now}
});

const contentSch = mongoose.model('contents', contents);
module.exports.contents = contentSch;
