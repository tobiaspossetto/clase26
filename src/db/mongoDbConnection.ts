import mongoose from 'mongoose'

// eslint-disable-next-line require-jsdoc
export function getConnectionMongo () {
  try {
    // eslint-disable-next-line quotes
    mongoose.connect(`mongodb+srv://tobias:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.ulmpx.mongodb.net/ecommerce?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB Connected')
  } catch (error) {
    console.log(error)
  }
}
