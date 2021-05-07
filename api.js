const categories = require('./categories')('./banco2.sqlite3')
const products = require('./products')('./banco2.sqlite3')

const test = async () => {
  /*
  // CATEGORIES
    await categories.create([2, 'Cat 2'])
    await categories.remove(8)
    await categories.update(1, ['Update Cat Api'])
    console.log(await categories.findAllCat())
    console.log('page 0', await categories.findAllPaginated({ pageSize: 2, currentPage: 0 }))
    console.log('page 1', await categories.findAllPaginated({ pageSize: 2, currentPage: 1 }))
    console.log('page 2', await categories.findAllPaginated({ pageSize: 2, currentPage: 2 }))
  // PRODUCTS
    await products.create([1, 'test', 90])
    await products.update(1, ['new prod', 89])
    await products.create([4, 'test', 55])
    await products.addImage(4, [4, 'url', 'descript'])
 */

  console.log(await products.findAll())
  console.log('cp: 0', await products.findAllPaginated({ pageSize: 2, currentPage: 1 }))

}

test()