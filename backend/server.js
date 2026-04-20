const express = require('express');
 require('dotenv').config()
const app = express();

const dbConnection = require('./config/db');

const port = process.env.PORT || 5000;
const errorHandler = require('./middlewares/errorHandlers');


app.use(express.json())
app.use(dbConnection);
app.use('/api/auth',require('./routers/auth'));
app.use('/api/workspaces',require('./routers/workspaces'));
app.use('/api/pages',require('./routers/pages'));
app.use('/api/blocks',require('./routers/blocks'));



app.use(errorHandler);

app.listen(port,()=>{
    console.log("server started");
})