const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose')
const route = require('./routes/shop-routes')

// Load env variables
dotenv.config({
  path: './config/config.env'
});
const app = express();
// Middlewares
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/v1/shops', route);
// End of Middlewares
// connect DB
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log('DB connection successful');
  })


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))