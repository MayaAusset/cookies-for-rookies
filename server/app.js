require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const cors = require("cors");
const logger       = require('morgan');
const path         = require('path');
const passport = require("passport");
const session = require("express-session");
const nodemailer = require("nodemailer");




require("./configs/db.configs");

require('./configs/passport.configs');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Cors Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

app.use(passport.initialize());
app.use(passport.session());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


//! NODEMAILER CONFIGURATION

app.post('/api/forma', (req, res) => {

  let data = req.body;

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    //port: 465,
    auth:{
      user: 'mayafinalproject@gmail.com',
      pass: process.env.pass,
    }
  });


  let mailOptions = {
    from: 'mayafinalproject@gmail.com',
    to: data.email,
    subject: `Message from Cookies For Rookies by ${data.name}`,
    html: `

    <h3>Here is a Recipe that you might like ! </h3>
    

    <h3>Message : </h3>
    <p> ${data.message}</p>

    `
  };

  transporter.sendMail(mailOptions, (error, info) => {

    if (error) {
      res.send(error)
    } else {
      res.send(`Email sent with success !`)
    }
  })

  transporter.close();

});

//const PORT =  5001;

/* app.listen(PORT, () => {
  console.log(`Server starting at port ${PORT}`)
}); */
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


app.use('/api', require("./routes/index"));
app.use("/api", require('./routes/recipes.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use("/api", require("./routes/fileUpload.routes"));

if (process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../client", "build", "index.html"));
  });
}

module.exports = app;
