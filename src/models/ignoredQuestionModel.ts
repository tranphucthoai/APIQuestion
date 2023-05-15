import mongoose, { Schema } from 'mongoose'

const ignoredQuestionSchema = new mongoose.Schema({
    questionList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Questions'
        }
    ],

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
    collection: 'IgnoredQuestion',
    timestamps: true
})

const IgnoredQuestions = mongoose.model('IgnoredQuestions', ignoredQuestionSchema)

export default IgnoredQuestions;