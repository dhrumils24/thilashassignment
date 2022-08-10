const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    academicYear:{
        type: String,
        required: true
    },
    classId:{
        type: Schema.Types.ObjectId,
        ref: 'Classes'
    },
})

let studentModel = mongoose.model('Student', studentSchema)
module.exports = studentModel