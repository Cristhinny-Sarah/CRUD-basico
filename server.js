const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000;
const mongoDBurl = 'mongodb+srv://user-cris:Bora12Codar@cluster0.xhk8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
/* mongoose.connect('mongodb://localhost:27017/curso-mern', { */
mongoose.connect(mongoDBurl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado com sucesso!');
})

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(routes);

app.listen(port, function(){
  console.log(`Server running on port ${port}`);
});