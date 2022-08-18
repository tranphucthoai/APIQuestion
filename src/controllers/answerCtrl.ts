import Answers from "../models/answerModel"
import { APIfeatures } from "../lib/features";
import { PAGE_START, PAGINATION } from "../constans"

const answerCtrl = {
    getall: async (req, res) => {
        try {
            const features = new APIfeatures(Answers.find(), req.query)
                .paginating().sorting().searching().filtering()

            const result = await Promise.allSettled([
                features.query,
                Answers.countDocuments()
            ])
            const answers = result[0].status === 'fulfilled' ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;

            Answers.find({}).then(data => {
                return res.status(200).json({
                    answers, pagination: {
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
            const answer = await Answers.findById(req.params.id)

            if (!answer)
                return res.status(404).json({ msg: 'This answer does not exist.' })

            return res.status(200).json(answer)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    add: async (req, res) => {
        try {
            const { name } = req.body;

            const newAnswer = new Answers({
                name
            })
            await newAnswer.save()

            return res.status(200).json(newAnswer)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req, res) => {
        try {
            const { name } = req.body;

            const answer = await Answers.findByIdAndUpdate(req.params.id, {
                name
            }, { new: true })

            if (!answer)
                return res.status(404).json({ msg: 'This answer does not exist.' })

            return res.status(200).json(answer)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req, res) => {
        try {

            const answer = await Answers.findByIdAndDelete(req.params.id)

            if (!answer)
                return res.status(404).json({ msg: 'This answer does not exist.' })

            return res.status(200).json({ msg: 'Delete Success!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default answerCtrl;