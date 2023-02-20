const express = require('express');

const app = express();


const port = 23000;

app.get('/api/health', (req, res) => {
    res.send({status:"ok"});
  });
  
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
