const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceRulesSchema = new Schema ({
    type: { // type of rules schema: day, daily or weekly
        type: String,
        required: true,
    },

    day: { // date of day selected, only for type day
        type: Date,
    },

    days: { // list of days selected, only for type weekly
        type: Array,
    },

    intervals: { // intervals of rules schema
        type: Array,
        required: true,
        start: {
            type: String,
            required: true
        },
    
        end: {
            type: String,
            required: true
        }
    }
})

module.exports = mongoose.model('attendanceRules', attendanceRulesSchema);