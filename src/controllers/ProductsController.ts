import { Product } from '../db/models/product'
interface IProduct {
    title: string;
    price: number;
    thumbnail: string;

}

export default class ProductsController {
  async saveProduct (data: IProduct) {
    try {
      const newProduct = {
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
        created_at: new Date().toISOString()

      }
      try {
        const newModel = new Product(newProduct)
        const res = await newModel.save()
        return { status: 1, data: res }
      } catch (error) {
        console.error(error)
        return { status: -1, data: error }
      }
    } catch (error) {
      console.error(error)
      return { status: -1, data: error }
    }
  }

  async listAll () {
    try {
      console.log('listando')
      const res = await Product.find()
      return { status: 1, data: res }
    } catch (error) {
      console.error(error)
      return { status: -1, data: error }
    }
  }
}
