const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const shopRoute = require('./routes/shop-routes');
const userRoute = require('./routes/user-routes');
// const phoneRoute = require('./routes/phone-routes');
const pusherRoute = require('./routes/pusher-routes');
const {
  getPhoneVerificationCodes,
  addPhoneVerificationCode
} = require('./controllers/phone.controller');

// Load env variables
dotenv.config({
  path: './config.env'
});

const DB = process.env.DATABASE;
const app = express();
// Middlewares
// Set security HTTP headers
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Routes
app.get('/', (req, res) => res.send('Server is running'));
app.post('/api/v1/send-code', addPhoneVerificationCode);
app.post('/api/v1/verify-code', getPhoneVerificationCodes);
app.use('/pusher', pusherRoute);
app.use('/api/v1/shops', shopRoute);
app.use('/api/v1/users', userRoute);
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

const PORT = process.env.PORT || 5000;
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
