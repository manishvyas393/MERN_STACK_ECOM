const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const cors = require("cors")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const session = require("express-session")
const Store = require("connect-mongodb-session")
const MyStore = Store(session)
const path = require('path');
const oneDay = 1000 * 60 * 60;
const mongoose = require("mongoose")
const dotenv = require("dotenv")
//route imports
const products = require("./routes/productRoute")
const users = require("./routes/userRoutes")
const orders = require("./routes/orderRoutes")
const payment = require("./routes/paymentRoutes")
dotenv.config()
mongoose.connect(process.env.DB_URL).then((data) => console.log(`connected port:${data.connection.host}`))
app.set('trust proxy', true);
app.use(cors({
      origin: true,
      credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
      secret: "qwertyuiopoiuytrewqwertyui",
      resave: true,
      saveUninitialized: false,
      cookie: {
            maxAge: oneDay,
            secure: false
      },
      store: new MyStore({
            uri: process.env.DB_URL,
            collection: 'sessions',
      }),
}));
app.use(fileUpload({
      useTempFiles: true
}))



app.use("/api", products)
app.use("/api", users)
app.use("/api", orders)
app.use("/api", payment)

if (process.env.NODE_ENV === "production") {
      //Set static folder
      app.use(express.static("frontend/build"));
      app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
      });
}
//Middleware for error

app.use(errorMiddleware)
module.exports = app