import mongoose, { Schema } from 'mongoose'

const correctAnswerSchema = new mongoose.Schema({
    result: {
        type: Array,
        required: true,
    },
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    idQuestion: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Questions'
    },
    idExercise: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Exercises'
    },
}, {
    timestamps: true
})

const CorrectAnswers = mongoose.model('CorrectAnswers', correctAnswerSchema)

export default CorrectAnswers;