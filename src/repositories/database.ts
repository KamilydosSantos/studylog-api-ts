import sqlite3 from 'sqlite3';
const DBSOURCE = 'db.sqlite';
const SQL_ITENS_CREATE = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        userName TEXT,
        bio TEXT,
        picture TEXT
    )`;
const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Base de dados conectada com sucesso.');
        database.run(SQL_ITENS_CREATE, (err) => {
            if (err) {
            } else {
                console.log('Tabela usuário criada com sucesso.');
            }
        })
    }
})
export default database;