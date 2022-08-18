import mongoose, { Schema } from 'mongoose'

const attentionQuestionSchema = new mongoose.Schema({
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

const AttentionQuestions = mongoose.model('AttentionQuestions', attentionQuestionSchema)

export default AttentionQuestions;