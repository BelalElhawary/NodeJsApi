const { createPool } = require('mysql');

const pool = createPool({
    port: 3306,
    host: 'sql750.main-hosting.eu',
    user:'u227215459_root',
    password:'Bb281655900',
    database:'u227215459_elsa5ra',
    connectionLimit: 10
})

module.exports = pool;