require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado com sucesso!');
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(routes);

app.listen(port, function(){
  console.log(`Server running on port ${port}`);
});