var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var collegeSchema = new Schema({
    college_name: {
        type: String,
        required: true,
        default: false
    },

    location: {
        type: String,
        required: true
    },

    total_student: {
        type: Number,
        required: true
    },

    affiliation: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },  
    
    courses: {
        type: String,
        required: true
    },

    credit_hours: {
        type: Number,
        required: true
    },

    Fees: {
        type: Number,
        required: true
    },

    Scholarship_criteria: {
        type: String,
        required: true
    }

});

var Colleges = mongoose.model("College", collegeSchema);
module.exports = Colleges;

