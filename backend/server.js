const express = require('express');
const app = express();
app.use(express.json())

const hardRouter = require('./Routers/hardRouter')

app.use("/hardware", hardRouter);

app.listen(3000);