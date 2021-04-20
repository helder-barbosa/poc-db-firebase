
const db = require('./db')

const init = database => {


  const create = async (data) => {
    const dbConn = await db.initDB(database)
    await db.queryWithParams(dbConn, `insert into products (id, product, price) values(?, ?, ?)`, data)
  }

  const findAll = async () => {
    const dbConn = await db.initDB(database)
    return await db.query(dbConn, `select * from products left join images on products.id = images.product_id group by images.product_id`)
  }

  const remove = async (id) => {
    const dbConn = await db.initDB(database)
    await db.queryWithParams(dbConn, `delete from products where id=?`, [id])
    await db.queryWithParams(dbConn, `delete from images where product_id=?`, [id])

  }

  const update = async (id, data) => {
    const dbConn = await db.initDB(database)
    await db.queryWithParams(dbConn, `update products set product=?, price=? where id=?`, [...data, id])
  }

  const addImage = async (productId, data) => {
    const dbConn = await db.initDB(database)
    await db.queryWithParams(dbConn, `insert into images(id , url, description, product_id) values (?, ?, ?, ?)`, [...data, productId])
  }

  const findAllPaginated = async ({ pageSize = 1, currentPage = 0 }) => {
    const dbConn = await db.initDB(database)
    const records = await db.query(dbConn, `select * from products limit ${currentPage * pageSize}, ${pageSize + 1}`)
    if (records.length > pageSize) {
      records.pop()
    }
    return {
      data: records,
      hasNext: records.length > pageSize
    }
  }
  return { findAllPaginated, update, remove, findAll, create, addImage }
}

module.exports = init

