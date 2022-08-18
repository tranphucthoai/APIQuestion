import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // index: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
  }
}, {
  collection: 'Product',
  timestamps: true,
})

const Products = mongoose.model('products', productSchema)

export default Products;