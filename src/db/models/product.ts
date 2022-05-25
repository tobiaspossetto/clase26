import mongoose from 'mongoose'

const prodCollection = 'products'

const ProdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  created_at: {
    type: String,
    required: true
  }
})
export const Product = mongoose.model(prodCollection, ProdSchema)
