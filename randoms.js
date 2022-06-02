const cant = parseInt(process.argv[2])

const randomNumbers = []

for (let i = 0; i < cant; i++) {
  randomNumbers.push(Math.floor(Math.random() * 1000) + 1)
}

const countOcurrences = (arr) =>
  arr.reduce((obj, e) => {
    obj[e] = (obj[e] || 0) + 1
    return obj
  }, {})

process.send(countOcurrences(randomNumbers))
