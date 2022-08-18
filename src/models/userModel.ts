import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  idRole: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Roles'
  },
}, {
  timestamps: true
})

const Users = mongoose.model('Users', userSchema)

export default Users;