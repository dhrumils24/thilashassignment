const express = require('express')
const Student = require('../model/studentModel')
const Classes = require('../model/classModel')
const app = express.Router()

app.get('/', async (req, res) => {
    try {
        let results = await Student.find()
        res.send(results)

    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const student = await Student.findById(id)
        res.send(student)
    } catch (error) {
        res.status(400).json('No Student found for given ID')
        console.log(error)
    }
})


app.post('/', async (req, res) => {
    const {name, dob, academicYear, classId} = req.body
    try {
        if(!name || !dob || !academicYear || !classId){
            res.status(400).json('Fill in all the details')
            return
        }
        try {
            const c = await Classes.findById(classId)
        } catch (error) {
            res.status(400).json('Incorrect Class. Class not found for given classId')
            return
        }

        const newStudent = new Student({name, dob, academicYear, classId})
        await newStudent.save()
        res.send('Student created successfully')
    } catch (error) {
        res.status(400).json('Bad Request | Check inputs or check console for more info')
        console.log(error)
    }
})

app.put('/:id', async (req, res) => {
    const {id} = req.params
    const {name, dob, academicYear, classId} = req.body
    try {
        if(!name || !dob || !academicYear || !classId){
            res.status(400).json('Fill in all the details')
            return
        }
        try {
            const c = await Classes.findById(classId)
        } catch (error) {
            res.status(400).json('Incorrect Class. Class not found for given classId')
            return
        }

        const oldData = await Student.findById(id)

        oldData.name = name
        oldData.dob = dob
        oldData.academicYear = academicYear
        oldData.classId = classId
        await oldData.save()

        res.send('Updated Successfully')
    } catch (error) {
        res.status(400).json('Bad Request | Check Student ID and other inputs or check console for more info')
        console.log(error)
    }
})

app.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const oldData = await Student.findById(id)
        await oldData.deleteOne({_id: id})
        res.send('Deleted Successfully')

    } catch (error) {
        res.status(400).json('Bad Request | Check Student ID or check console for more info')
        console.log(error)
    }
})

module.exports = app

