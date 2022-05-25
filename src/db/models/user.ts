import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
const userCollection = 'users'
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }

})

UserSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const User = mongoose.model(userCollection, UserSchema)
