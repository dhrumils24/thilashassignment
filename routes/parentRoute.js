const express = require('express')
const Parent = require('../model/parentModel')
const Student = require('../model/studentModel')
const app = express.Router()

app.get('/', async (req, res) => {
    try {
        let results = await Parent.find()
        res.send(results)

    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const parent = await Parent.findById(id)
        res.send(parent)
    } catch (error) {
        res.status(400).json('No Parent found for given ID')
    }
})

app.post('/', async (req, res) => {
    const {name, mobile, email, studentId} = req.body
    try {
        if(!name || !mobile || !email || !studentId){
            res.status(400).json('Fill in all the details')
            return
        }
        console.log(mobile)
        try {
            const student = await Student.findById(studentId)
        } catch (error) {
            res.status(400).json('Incorrect Student. Student not found for given studentId')
            return
        }
        
        const newParent = new Parent({name, mobile, email, studentId})
        await newParent.save()
        res.send('Parent created successfully')
    } catch (error) {
        res.status(400).json('Bad Request | Check inputs or check console for more info')
        console.log(error)
    }
})

app.put('/:id', async (req, res) => {
    const {id} = req.params
    const {name, mobile, email, studentId} = req.body
    try {       
        if(!name || !mobile || !email || !studentId){
            res.status(400).json('Fill in all the details')
            return
        }
        try {
            const student = await Student.findById(studentId)
        } catch (error) {
            res.status(400).json('Incorrect Student. Student not found for given studentId')
            return
        }

        const oldData = await Parent.findById(id)

        oldData.name = name
        oldData.mobile = mobile
        oldData.email = email
        oldData.studentId = studentId
        await oldData.save()

        res.send('Updated Successfully')
    } catch (error) {
        res.status(400).json('Bad Request | Check Parent ID and other inputs or check console for more info')
        console.log(error)
    }
})

app.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const oldData = await Parent.findById(id)
        await oldData.deleteOne({_id: id})
        res.send('Deleted Successfully')

    } catch (error) {
        res.status(400).json('Bad Request | Check Parent ID or check console for more info')
        console.log(error)
    }
})

module.exports = app

