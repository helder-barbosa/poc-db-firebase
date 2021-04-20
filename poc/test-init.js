const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database('banco2.sqlite3', (err) => {
  console.log(err, 'init')
})
