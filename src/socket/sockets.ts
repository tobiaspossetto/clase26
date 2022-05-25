import ProductsController from '../controllers/ProductsController'
import MsgController from '../controllers/MsgController'
const msgController = new MsgController()
const prodController = new ProductsController()
export default (io: any) => {
  io.on('connection', async (io: any) => {
    console.log('new user connected')
    io.emit('PRODUCTS', await getProduct())
    io.emit('MESSAGES', await getMessages())

    // ON
    io.on('NEW_PRODUCT', async (data: any) => {
      const res = await prodController.saveProduct(data)
      if (res.status === 1) {
        console.log(res.data)
      } else {
        console.log('ERROR: ', res.data)
      }

      io.emit('PRODUCTS', await getProduct())
    })

    io.on('NEW_MESSAGE', async (data:any) => {
      const res = await msgController.saveMessage(data)
      if (res.status === 1) {
        console.log(res.data)
      } else {
        console.log('ERROR: ', res.data)
      }

      io.emit('MESSAGES', await getMessages())
    })
  })
}

const getProduct = async () => {
  const res = await prodController.listAll()
  if (res.status === -1) {
    console.log('ERROR: ', res.data)
    return { error: true, data: res.data }
  } else {
    return { error: false, data: res.data }
  }
}

const getMessages = async () => {
  const res = await msgController.getMessages()
  if (res.status === -1) {
    console.log('ERROR: ', res.data)
    return { error: true, data: res.data }
  } else {
    return { error: false, data: res.data }
  }
}
