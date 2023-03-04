const express = require('express');
var bodyParser = require('body-parser')
const databaseConfig= {
  "host": "localhost",
  "port": 5431,
  "database": "postgres",
  "user": "postgres",
  "password": "pass"
};

const pgp = require("pg-promise")({});
const db = pgp(databaseConfig);

const jsonParser = bodyParser.json()
const app = express();

//db.none('CREATE TABLE test (slug VARCHAR(50) PRIMARY KEY, content VARCHAR(50));')
// https://expressjs.com/en/guide/database-integration.html#postgresql
// https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
const port = 23000;

app.get('/api/health', (req, res) => {
    res.send({status:"ok"});
  });
  

app.get('/api/content', async (req, res) => {
  result = await db.many('SELECT * FROM test')
  console.log(result)
  res.send(result)
})

app.get('/api/content/:slug', async (req, res) => {
  const {slug} = req.params
  result = await db.one(`SELECT * FROM test WHERE slug='${slug}'`)
  console.log(result)
  res.send(result)
})

app.post('/api/content', jsonParser, async (req, res) => {
  console.log(req.body)
  const n = req.body.length;
  console.log(n)
  console.log( `(${req.body[0].slug},${req.body[0].content})`)
  const values = req.body.reduce((acc, obj, idx) => acc + `('${obj.slug}','${obj.content}'),`, '')
  
  
  console.log(`INSERT INTO test (slug, content) VALUES ${values};`)
  await db.none(`INSERT INTO test (slug, content) VALUES ${values.slice(0, values.length - 1)};`);
})

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
