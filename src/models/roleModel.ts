import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
    create: {
        type: Boolean,
        required: true,
        default: true,
    },
    read: {
        type: Boolean,
        required: true,
        default: true,
    },
    update: {
        type: Boolean,
        required: true,
        default: true,
    },
    delete: {
        type: Boolean,
        required: true,
        default: true,
    },
    crudAll: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    collection: 'Role',
    timestamps: true
})

const Roles = mongoose.model('Roles', roleSchema)

export default Roles;