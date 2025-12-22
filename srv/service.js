const cds = require('@sap/cds')

module.exports = class BookstoreService extends cds.ApplicationService {
  init() {

    const { Books } = cds.entities('BookstoreService')

    this.before('READ', Books, async (req) => {
      console.log('Before READ Books')
    })
    this.on('READ', Books, async (req, next) => {
      console.log('ON EVENT')
      return next()
    })
    this.after('READ', Books, async (books, req) => {
      for (const book of books) {
        if (book.genre_code === 'Art') {
          book.price = book.price * 0.8
        }
      }
      console.log('AFTER READ')
    })

    return super.init()
  }
}
