const express = require('express')
const Classes = require('../model/classModel')
const app = express.Router()

app.get('/', async (req, res) => {
    try {
        let results = await Classes.find()
        res.send(results)

    } catch (error) {
        res.status(400).json(error)
    }
})

app.post('/', async (req, res) => {
    
    const {className, sectionName} = req.body
    if(!className ){
        res.status(400).json('Fill in all the details')
        return
    }

    try {
        const newClass = new Classes({className, sectionName})
        await newClass.save()
        res.send('Class created successfully')
    } catch (error) {
        res.status(400).json('Bad Request | Check inputs or check console for more info')
        console.log(error)
    }
})

app.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const oldClass = await Classes.findById(id)
        res.send(oldClass)
    } catch (error) {
        res.status(400).json('No Class found for given ID')
        console.log(error)
    }
})

app.put('/:id', async (req, res) => {
    const {id} = req.params
    const {className, sectionName} = req.body
    if(!className ){
        res.status(400).json('Fill in all the details')
        return
    }
    try {
        const oldClass = await Classes.findById(id)
        oldClass.className = className
        oldClass.sectionName = sectionName
        await oldClass.save()

        res.send('Updated Successfully')
    } catch (error) {
        res.status(400).json('Bad Request | Check Course ID and other inputs or check console for more info')
        console.log(error)
    }
})

app.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const oldClass = await Classes.findById(id)
        await oldClass.deleteOne({_id: id})
        res.send('Deleted Successfully')

    } catch (error) {
        res.status(400).json('Bad Request | Check Class ID or check console for more info')
        console.log(error)
    }
})

module.exports = app

