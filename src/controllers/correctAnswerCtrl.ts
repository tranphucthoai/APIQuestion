import CorrectAnswer from "../models/correctAnswerModel"
import { APIfeatures } from "../lib/features";
import { PAGE_START, PAGINATION } from "../constans"

const correctAnswerCtrl = {
    getall: async (req, res) => {
        try {
            const features = new APIfeatures(CorrectAnswer.find(), req.query)
                .paginating().sorting().searching().filtering()

            const result = await Promise.allSettled([
                features.query,
                CorrectAnswer.countDocuments()
            ])
            const correctAnswer = result[0].status === 'fulfilled' ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;

            CorrectAnswer.find({}).then(data => {
                return res.status(200).json({
                    correctAnswer, pagination: {
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
            const correctAnswer = await CorrectAnswer.findById(req.params.id)

            if (!correctAnswer)
                return res.status(404).json({ msg: 'This correctAnswer does not exist.' })

            return res.status(200).json(correctAnswer)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    add: async (req, res) => {
        try {
            const { name } = req.body;

            const newCorrectAnswer = new CorrectAnswer({
                name
            })
            await newCorrectAnswer.save()

            return res.status(200).json(newCorrectAnswer)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req, res) => {
        try {
            const { name } = req.body;

            const correctAnswer = await CorrectAnswer.findByIdAndUpdate(req.params.id, {
                name
            }, { new: true })

            if (!correctAnswer)
                return res.status(404).json({ msg: 'This correctAnswer does not exist.' })

            return res.status(200).json(correctAnswer)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req, res) => {
        try {

            const correctAnswer = await CorrectAnswer.findByIdAndDelete(req.params.id)

            if (!correctAnswer)
                return res.status(404).json({ msg: 'This correctAnswer does not exist.' })

            return res.status(200).json({ msg: 'Delete Success!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default correctAnswerCtrl;