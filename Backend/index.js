const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.get('/signup' , (req,res) => {
    res.send('ping');
})

app.listen(PORT , () => console.log(`server is runnig on ${PORT}`));