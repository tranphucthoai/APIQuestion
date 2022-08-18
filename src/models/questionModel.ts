import mongoose, { Schema } from 'mongoose'

const questionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    idExercise: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Exercises'
    },
}, {
    timestamps: true
})

const Questions = mongoose.model('Questions', questionSchema)

export default Questions;