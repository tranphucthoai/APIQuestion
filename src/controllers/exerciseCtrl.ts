import Exercises from "../models/exerciseModel"
import { APIfeatures } from "../lib/features";
import { PAGE_START, PAGINATION } from "../constans"

const exerciseCtrl = {
    getall: async (req, res) => {
        try {
            const features = new APIfeatures(Exercises.find(), req.query)
                .paginating().sorting().searching().filtering()

            const result = await Promise.allSettled([
                features.query,
                Exercises.countDocuments()
            ])
            const exercises = result[0].status === 'fulfilled' ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;

            Exercises.find({}).then(data => {
                return res.status(200).json({
                    exercises, pagination: {
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
            const exercise = await Exercises.findById(req.params.id)

            if (!exercise)
                return res.status(404).json({ msg: 'This exercise does not exist.' })

            return res.status(200).json(exercise)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    add: async (req, res) => {
        try {
            const { name } = req.body;

            const newExercise = new Exercises({
                name
            })
            await newExercise.save()

            return res.status(200).json(newExercise)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req, res) => {
        try {
            const { name, description, idUser } = req.body;

            const exercise = await Exercises.findByIdAndUpdate(req.params.id, {
                name, description, idUser
            }, { new: true })

            if (!exercise)
                return res.status(404).json({ msg: 'This exercise does not exist.' })

            return res.status(200).json(exercise)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req, res) => {
        try {

            const exercise = await Exercises.findByIdAndDelete(req.params.id)

            if (!exercise)
                return res.status(404).json({ msg: 'This exercise does not exist.' })

            return res.status(200).json({ msg: 'Delete Success!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default exerciseCtrl;