const express = require('express');
const pgp = require('pg-promise')
const db = pgp('postgres://postgress:pass@localhost:5432/postgres')
const app = express();

// https://expressjs.com/en/guide/database-integration.html#postgresql
// https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
const port = 23000;

app.get('/api/health', (req, res) => {
    res.send({status:"ok"});
  });
  

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
