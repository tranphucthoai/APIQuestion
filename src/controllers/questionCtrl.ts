import Questions from "../models/questionModel"
import { APIfeatures } from "../lib/features";
import { PAGE_START, PAGINATION } from "../constans"

const questionCtrl = {
    getall: async (req, res) => {
        try {
            const features = new APIfeatures(Questions.find(), req.query)
                .paginating().sorting().searching().filtering()

            const result = await Promise.allSettled([
                features.query,
                Questions.countDocuments()
            ])
            const questions = result[0].status === 'fulfilled' ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;

            Questions.find({}).then(data => {
                return res.status(200).json({
                    questions, pagination: {
                        page: req.query.page || PAGE_START,
                        limit: req.query.limit || PAGINATION,
                        totalRow: count,
                    }
                })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    get: async (req, res) => {
        try {
            const question = await Questions.findById(req.params.id)

            if (!question)
                return res.status(404).json({ msg: 'This question does not exist.' })

            return res.status(200).json(question)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    add: async (req, res) => {
        try {
            const { name } = req.body;

            const newQuestion = new Questions({
                name
            })
            await newQuestion.save()

            return res.status(200).json(newQuestion)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req, res) => {
        try {
            const { name, answers, idUser , idExercise } = req.body;

            const question = await Questions.findByIdAndUpdate(req.params.id, {
                name,
                answers,
                idUser,
                idExercise
            }, { new: true })

            if (!question)
                return res.status(404).json({ msg: 'This question does not exist.' })

            return res.status(200).json(question)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req, res) => {
        try {

            const question = await Questions.findByIdAndDelete(req.params.id)

            if (!question)
                return res.status(404).json({ msg: 'This question does not exist.' })

            return res.status(200).json({ msg: 'Delete Success!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default questionCtrl;