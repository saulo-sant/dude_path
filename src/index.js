const express = require('express');
var bodyParser = require('body-parser')
const pgp = require("pg-promise")({});
// https://expressjs.com/en/guide/database-integration.html#postgresql
// https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/

const jsonParser = bodyParser.json()
const app = express();
const port = 23000;
const databaseConfig= {
  "host": "postgres",
  "port": 5432,
  "database": "postgres",
  "user": "postgres",
  "password": "pass"
};


const db = pgp(databaseConfig);
// Copied from phind. Just a test
db.query('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = \'public\'')
  .then(result => {
    result.forEach(row => {
      console.log(row.tablename);
    });
  })
  .catch(error => {
    console.log(error);
  });


db.none('CREATE TABLE test (slug VARCHAR(50) PRIMARY KEY, content VARCHAR(50));')



// CRUD SERVICES

app.get('/api/health', (req, res) => {
    res.send({status:"ok"});
  });
  

app.get('/api/content', async (req, res) => {
  result = await db.many('SELECT * FROM test')
  res.send(result)
})

app.get('/api/content/:slug', async (req, res) => {
  const {slug} = req.params
  result = await db.one(`SELECT * FROM test WHERE slug='${slug}'`)
  res.send(result)
})

app.post('/api/content', jsonParser, async (req, res) => {
  const values = req.body.reduce((acc, obj, idx) => acc + `('${obj.slug}','${obj.content}'),`, '')
  await db.none(`INSERT INTO test (slug, content) VALUES ${values.slice(0, values.length - 1)};`);
  res.send({status: "everything added"})

})

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));


