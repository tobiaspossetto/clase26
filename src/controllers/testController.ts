import { faker } from '@faker-js/faker'

export const fakeProducts = () => {
  try {
    const data = []
    for (let i = 0; i < 5; i++) {
      data.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),

        image: faker.image.image()
      })
    }
    return data
  } catch (error) {
    console.log(error)
  }
}
