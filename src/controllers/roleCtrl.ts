import Roles from "../models/roleModel"
import { APIfeatures } from "../lib/features";
import { PAGE_START, PAGINATION } from "../constans"

const roleCtr = {
  getall: async (req, res) => {
    try {
      const features = new APIfeatures(Roles.find(), req.query)
        .paginating().sorting().searching().filtering()

      const result = await Promise.allSettled([
        features.query,
        Roles.countDocuments()
      ])
      const roles = result[0].status === 'fulfilled' ? result[0].value : [];
      const count = result[1].status === 'fulfilled' ? result[1].value : 0;

      Roles.find({}).then(data => {
        return res.status(200).json({
          roles, pagination: {
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
      const roles = await Roles.findById(req.params.id)

      if (!roles)
        return res.status(404).json({ msg: 'This role does not exist.' })

      return res.status(200).json(roles)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  add: async (req, res) => {
    try {
      const { create, update, read, delete: del, crudAll } = req.body;

      const newRoles = new Roles({
        create, update, read, delete: del, crudAll
      })
      await newRoles.save()

      return res.status(200).json(newRoles)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  update: async (req, res) => {
    try {
      const { create, update, read, delete: del, crudAll } = req.body;

      const role = await Roles.findByIdAndUpdate(req.params.id, {
        create, update, read, delete: del, crudAll
      }, { new: true })

      if (!role)
        return res.status(404).json({ msg: 'This role does not exist.' })

      return res.status(200).json(role)
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  delete: async (req, res) => {
    try {

      const role = await Roles.findByIdAndDelete(req.params.id)

      if (!role)
        return res.status(404).json({ msg: 'This role does not exist.' })

      return res.status(200).json({ msg: 'Delete Success!' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default roleCtr;