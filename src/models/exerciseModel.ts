import mongoose, { Schema } from 'mongoose'

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
    },
    description: {
        type: String,
        required: true,
    },
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
}, {
    collection: 'Exercise',
    timestamps: true
})

const Exercises = mongoose.model('Exercises', exerciseSchema)

export default Exercises;