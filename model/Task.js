const mongoose = require('mongoose');

const {Schema} = mongoose;

const taskSchema = new Schema({
    id: Number,
    title: String,
    description: String,
    priority: String,
    emoji: String,
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task