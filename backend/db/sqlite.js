const path = require('path')
const Database = require('better-sqlite3')

const dbPath = path.join(__dirname, '..', 'data.sqlite')
const db = new Database(dbPath)

// Ensure a single-row counter table exists
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS counter (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    value INTEGER NOT NULL
  )
`,
).run()

// Seed with 0 if empty
const row = db.prepare('SELECT value FROM counter WHERE id = 1').get()
if (!row) {
  db.prepare('INSERT INTO counter (id, value) VALUES (1, 0)').run()
}

function getCounterValue() {
  const item = db.prepare('SELECT value FROM counter WHERE id = 1').get()
  return item?.value ?? 0
}

function setCounterValue(nextValue) {
  db.prepare('UPDATE counter SET value = ? WHERE id = 1').run(nextValue)
  return getCounterValue()
}

module.exports = {
  db,
  getCounterValue,
  setCounterValue,
}



