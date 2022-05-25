import { Msg } from '../db/models/msg'

interface IAuthor{
    name: string;
    id:string;
    apellid:string;
    alias:string;
    edad:string;
    avatar:string;

}

interface IMessage{
    author:IAuthor;
    message:string;
    created_at?:string;
}
export default class MsgController {
  async saveMessage (msg:IMessage) {
    try {
      const message:IMessage = {
        author: {
          ...msg.author
        },

        message: msg.message,
        created_at: new Date().toISOString()
      }

      console.log('MENSAJE A GUARDAR ', message)
      try {
        const newMsg = new Msg(message)
        const res = await newMsg.save()
        return { status: 1, data: res }
      } catch (error) {
        return { status: -1, data: error }
      }
    } catch (error) {
      console.error(error)
      return { status: -1, data: error }
    }
  }

  async getMessages () {
    try {
      const data = await Msg.find()
      return { status: 1, data }
    } catch (error) {
      console.error(error)
      return { status: -1, data: error }
    }
  }
}
