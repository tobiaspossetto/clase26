import bcrypt from 'bcrypt-nodejs'
export const validPassword = (passwordToCheck: string, dbPassword:string) => {
  return bcrypt.compareSync(passwordToCheck, dbPassword)
}
