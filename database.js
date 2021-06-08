const pgp = require('pg-promise')()

const user = 'anthonybuccat'
const password ="Mallawa1"
const host = 'localhost'
const pgPort = '5432'
const database = 'mrcoffee'

const connection = `postgres://${user}:${password}@${host}:${pgPort}/${database}`

const db = pgp(connection)

module.exports = db