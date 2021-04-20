
const db = require('./db')

const init = database => {


  const create = async (data) => {
    const dbConn = await db.initDB(database)
    await db.queryWithParams(dbConn, `insert into categories (id, category) values(?, ?)`, data)
  }

  const findAllCat = async () => {
    const dbConn = await db.initDB(database)
    return await db.query(dbConn, `select * from categories`)
  }

  const remove = async (id) => {
    const dbConn = await db.initDB(database)
    await db.queryWithParams(dbConn, `delete from categories where id=?`, [id])
  }

  const update = async (id, data) => {
    const dbConn = await db.initDB(database)
    await db.queryWithParams(dbConn, `update categories set category=? where id=?`, [...data, id])
  }

  const findAllPaginated = async ({ pageSize = 1, currentPage = 0 }) => {
    const dbConn = await db.initDB(database)
    const records = await db.query(dbConn, `select * from categories limit ${currentPage * pageSize}, ${pageSize + 1}`)
    if (records.length > pageSize) {
      records.pop()
    }
    return {
      data: records,
      hasNext: records.length > pageSize
    }
  }
  return { findAllPaginated, update, remove, findAllCat, create }
}

module.exports = init

