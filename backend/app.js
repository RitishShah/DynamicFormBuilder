const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
const formRoutes = require("./routes/formRoutes");

app.use('/api/v2', userRoutes);
app.use('/api/v2', formRoutes);

module.exports = app;