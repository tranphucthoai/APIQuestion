// ignoredQuestionCtrl

import IgnoredQuestions from "../models/ignoredQuestionModel"
import { APIfeatures } from "../lib/features";
import { PAGE_START, PAGINATION } from "../constans"

const ignoredQuestionCtrl = {
    getall: async (req, res) => {
        try {
            const features = new APIfeatures(IgnoredQuestions.find(), req.query)
                .paginating().sorting().searching().filtering()

            const result = await Promise.allSettled([
                features.query,
                IgnoredQuestions.countDocuments()
            ])
            const ignoredQuestions = result[0].status === 'fulfilled' ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;

            IgnoredQuestions.find({}).then(data => {
                return res.status(200).json({
                    ignoredQuestions, pagination: {
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
            const ignoredQuestion = await IgnoredQuestions.findById(req.params.id)

            if (!ignoredQuestion)
                return res.status(404).json({ msg: 'This ignoredQuestion does not exist.' })

            return res.status(200).json(ignoredQuestion)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    add: async (req, res) => {
        try {
            const { idUser, idExercise, idQuestion } = req.body;

            // const newIgnoredQuestion = new IgnoredQuestions({
            //     idUser,
            //     idExercise,
            //     questionList: []
            // })
            // await newIgnoredQuestion.save()

            const ignoredQuestionItem = await IgnoredQuestions.findOne(
                {
                    idUser,
                    idExercise
                })

            if (ignoredQuestionItem) {
                //has item
                const updateIgnoredQuestion = IgnoredQuestions.updateOne({
                    idUser,
                    idExercise
                }, {
                    ...ignoredQuestionItem,
                    questionList: [...ignoredQuestionItem?.questionList, idQuestion]
                }, { upsert: true });

                return res.status(200).json(updateIgnoredQuestion)

            } else {
                const newIgnoredQuestion = new IgnoredQuestions({
                    idUser, idExercise, questionList: [idQuestion]
                })

                await newIgnoredQuestion.save()

                return res.status(200).json(newIgnoredQuestion)
            }


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req, res) => {
        // try {
        //     const { idQuestion } = req.body;

        //     const ignoredQuestion = await IgnoredQuestions.findByIdAndUpdate(req.params.id, {
        //         questionList: 
        //     }, { new: true })

        //     if (!ignoredQuestion)
        //         return res.status(404).json({ msg: 'This ignoredQuestion does not exist.' })

        //     return res.status(200).json(ignoredQuestion)
        // } catch (err: any) {
        //     return res.status(500).json({ msg: err.message })
        // }
    },
    delete: async (req, res) => {
        try {

            const attentionAnswer = await IgnoredQuestions.findByIdAndDelete(req.params.id)

            if (!attentionAnswer)
                return res.status(404).json({ msg: 'This attentionAnswer does not exist.' })

            return res.status(200).json({ msg: 'Delete Success!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default ignoredQuestionCtrl;