require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const PORT = 3000
const Note = require('./models/fruit')
const logger = require('morgan')
const methodOverride = require('method-override')

app.use(express.json())
app.use(express.urlendocoded({extended: true}))
app.use(logger('tiny'))
app.use(methodOverride('_method'))
app.use('/assets', express.static('public'))

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('MongoDB is on and poppin')
})

mongoose.connection.on('error', () => {
    console.error('MongoDB is not working')
})


app.post('fruits', async (req, res) => {
    console.log(req.body.hasOwnProperty('text'))
    req.body.isReadyToEat === 'on' || req.body.isReadyToEat === true?
    req.body.isReadyToEat = true :
    req.body.isReadyToEat = false
    try {
        const createdFruit = await Note.create(req.body)
        res.redirect(`/fruits/${createdFruit._id}`)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

app.get('/fruits/new', (req, res) => {
    res.render('new.ejs')
})

app.get('/fruits', async (req, res) => {
    try {
        const foundFruits = await Fruit.find({})
        res.render('index.ejs', {
            fruits: foundFruits
        })
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

app.get('/fruits/:id', async (req, res) => {
    try {
        const foundFruit = await Fruit.findOne({_id: req.params.id})
        res.render('show.ejs', {
            fruit: foundFruit
        })
    } catch (error) {
        res.status(400).json({msg: error.message})
    }    
})

app.put('/fruits/:id', async (req, res) => {
    req.body.isReadyToEat === 'on' || req.body.isReadyToEat === true?
    req.body.isReadyToEat = true :
    req.body.isReadyToEat = false
    try {
        const updatedFruit = await Fruit.findOneAndUpdate ({_id: req.params.id}, req.body, {new: true})
        res.redirect(`/fruits/${updatedFruit._id}`)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})

