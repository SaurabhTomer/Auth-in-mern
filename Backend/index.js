const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/Authrouter');
const { connectDB } = require('./Models/db');
const ProductRouter = require('./routes/ProductRouter')

require('dotenv').config();
require('./Models/db')

connectDB();

const PORT = process.env.PORT || 8080;

app.get('/signup' , (req,res) => {
    res.send('ping');
})

app.use(bodyParser.json());
app.use(cors());

app.use('/auth' , AuthRouter)
app.use('/products' , ProductRouter)


app.listen(PORT , () => console.log(`server is runnig on ${PORT}`));