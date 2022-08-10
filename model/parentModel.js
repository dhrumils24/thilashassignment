const mongoose = require('mongoose')

const Schema = mongoose.Schema

const parentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    studentId:{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
})

let parentModel = mongoose.model('Parent', parentSchema)
module.exports = parentModel