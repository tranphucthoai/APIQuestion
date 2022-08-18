import Users from "../models/userModel"
import { APIfeatures } from "../lib/features";
import { PAGE_START, PAGINATION } from "../constans"

const userCtr = {
    getall: async (req, res) => {
        try {
            const features = new APIfeatures(Users.find(), req.query)
                .paginating().sorting().searching().filtering()

            const result = await Promise.allSettled([
                features.query,
                Users.countDocuments() //count number of products.
            ])

            const users = result[0].status === 'fulfilled' ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;

            return res.status(200).json({ users, count })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    get: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id)

            if (!user)
                return res.status(404).json({ msg: 'This user does not exist.' })

            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    add: async (req, res) => {
        try {
            const { title, price, description, category, image } = req.body;

            const newUser = new Users({
                title, price, description, category, image
            })
            await newUser.save()

            return res.status(200).json(newUser)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req, res) => {
        try {
            const { title, price, description, category, image } = req.body;

            const user = await Users.findByIdAndUpdate(req.params.id, {
                title, price, description, category, image
            }, { new: true })

            if (!user)
                return res.status(404).json({ msg: 'This user does not exist.' })

            return res.status(200).json(user)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req, res) => {
        try {

            const user = await Users.findByIdAndDelete(req.params.id)

            if (!user)
                return res.status(404).json({ msg: 'This user does not exist.' })

            return res.status(200).json({ msg: 'Delete Success!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default userCtr;