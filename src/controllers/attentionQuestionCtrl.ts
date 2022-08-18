import AttentionQuestions from "../models/attentionQuestionModel"
import { APIfeatures } from "../lib/features";
import { PAGE_START, PAGINATION } from "../constans"

const attentionQuestionCtrl = {
    getall: async (req, res) => {
        try {
            const features = new APIfeatures(AttentionQuestions.find(), req.query)
                .paginating().sorting().searching().filtering()

            const result = await Promise.allSettled([
                features.query,
                AttentionQuestions.countDocuments()
            ])
            const attentionQuestions = result[0].status === 'fulfilled' ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;

            AttentionQuestions.find({}).then(data => {
                return res.status(200).json({
                    attentionQuestions, pagination: {
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
            const attentionQuestion = await AttentionQuestions.findById(req.params.id)

            if (!attentionQuestion)
                return res.status(404).json({ msg: 'This attentionQuestion does not exist.' })

            return res.status(200).json(attentionQuestion)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    add: async (req, res) => {
        try {
            const { name } = req.body;

            const newAttentionQuestion = new AttentionQuestions({
                name
            })
            await newAttentionQuestion.save()

            return res.status(200).json(newAttentionQuestion)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req, res) => {
        try {
            const { name } = req.body;

            const attentionQuestion = await AttentionQuestions.findByIdAndUpdate(req.params.id, {
                name
            }, { new: true })

            if (!attentionQuestion)
                return res.status(404).json({ msg: 'This attentionQuestion does not exist.' })

            return res.status(200).json(attentionQuestion)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req, res) => {
        try {

            const attentionQuestion = await AttentionQuestions.findByIdAndDelete(req.params.id)

            if (!attentionQuestion)
                return res.status(404).json({ msg: 'This attentionQuestion does not exist.' })

            return res.status(200).json({ msg: 'Delete Success!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default attentionQuestionCtrl;