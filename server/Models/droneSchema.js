var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const droneSchema = new Schema(
    {
        type:
        {
            type: String,
            required: true
        },
        location:
        {
            type: String,
            required: true
        },
        position:
        [
            {
                _id: false,
                coordinates: { type: [Number], default: [0, 0], required: true },
                height: { type: Number, trim: true, default: 20, required: true },
            }
        ],
        icon:
        {
            type: String,
            required: true
        },
        date:
        {
            type: String,
            required: true
            //default: Date.now
        },
        author:
        {
            type: String,
            required: true
        },
        vidURL:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        show:
        {
            type: Boolean,
            default: true
        }
});

const contentSch = mongoose.model('droneSchema', droneSchema);
module.exports.contents = contentSch;
