const mongoose = require('mongoose')

const fruitSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isReadyToEat: { type: Boolean, required: true },  
}, {
    timestamps: true
})

const Note = mongoose.model('Fruit', fruitSchema)

module.exports = Fruit