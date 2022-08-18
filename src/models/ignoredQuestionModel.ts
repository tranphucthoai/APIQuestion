import mongoose, { Schema } from 'mongoose'

const ignoredQuestionSchema = new mongoose.Schema({
    listQuestion: {
        type: Array,
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

const IgnoredQuestions = mongoose.model('IgnoredQuestions', ignoredQuestionSchema)

export default IgnoredQuestions;