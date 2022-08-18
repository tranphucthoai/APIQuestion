import mongoose, { Schema } from 'mongoose'

const answerSchema = new mongoose.Schema({
    name: {
        type: String,
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

const Answers = mongoose.model('Answers', answerSchema)

export default Answers;