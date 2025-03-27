import knex from 'knex';
const knexdb = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'jedi',
    database: 'Cinema'
  }
});
export default knexdb;