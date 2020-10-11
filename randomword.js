
function randomWord(times) {
  const lowerEnglish = 'abcdefghijklmnopqrstuvwxyz'

  const numbers = '1234567890'

  const upperEnglish = lowerEnglish.toUpperCase().split("")

  const collection = lowerEnglish.split("").concat(upperEnglish, numbers.split(""))

  let record = []
  let sumWord = ""

  for (let i = 0; i < times; i++) {
    let index = Math.floor(Math.random() * collection.length)
    record.push(index)
    let checkNumber = record.some(item => item > 51)

    if (checkNumber) sumWord += collection[index]
    else {
      let number = Math.floor(Math.random() * 10)
      sumWord += number
      record.push(100)
    }
  }

  return sumWord
}


module.exports = randomWord