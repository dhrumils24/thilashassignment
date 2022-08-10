const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classSchema = new Schema({
    className:{
        type: String,
        required: true
    },
    sectionName:{
        type: String,
    }
})

let classModel = mongoose.model('Classes', classSchema)
module.exports = classModel