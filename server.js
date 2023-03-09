require('dotenv').config();
require('./server/config/database.js')

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

const userRouter = require('./server/api/users/user.router.js');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users',userRouter)

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
