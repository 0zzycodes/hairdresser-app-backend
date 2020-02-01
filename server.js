const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./routes/shop-routes');

// Load env variables
dotenv.config({
  path: './config.env'
});
const DB = process.env.DATABASE;
const app = express();
// Middlewares
app.use(express.json());
app.use(cors());
// Routes
app.get('/', (req, res) => res.send('Server is Running'));
app.use('/api/v1/shops', route);
// End of Middlewares
// connect DB
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥💥💥💥💥💥💥💥 Shutting down....');
  console.log(
    '💥💥💥💥💥💥💥💥💥💥 ',
    err.name,
    err.message,
    '💥💥💥💥💥💥💥💥💥💥'
  );
  server.close(() => {
    process.exit(1);
  });
});
mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    // console.log(con.connections);
    console.log('DB connection successful');
  });

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥💥💥💥💥💥💥💥 Shutting down....');
  console.log(
    '💥💥💥💥💥💥💥💥💥💥 ',
    err.name,
    err.message,
    '💥💥💥💥💥💥💥💥💥💥'
  );
  server.close(() => {
    process.exit(1);
  });
});
