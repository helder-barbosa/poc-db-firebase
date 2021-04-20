const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise((resolve, reject) => {
  const db = new sqlite.Database(databaseFile, (err) => {
    if (err) {
      reject(err)
    } else {
      resolve(db)
    }
  })
})

const run = (db, query, values) => new Promise((resolve, reject) => {
  db.run(query, values, err => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})

const updateProduct = async () => {
  const db = await initDB('banco2.sqlite3')
  await run(db, `update products set product=? where id=?`, ['prod atualizado', 8])
  console.log('product updated !')
}
updateProduct().catch(err => {
  console.log(err)
})


