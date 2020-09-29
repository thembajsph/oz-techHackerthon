//set up flash for my warning messages
const flash = require('express-flash');
const session = require('express-session');
const gpBookings = require('./gp-bookings')
const express = require("express");
const app = express();


const exphbs = require('express-handlebars');

// //get body parser / instantiate
const bodyParser = require('body-parser');


// always require your pg
const pg = require("pg");
const Pool = pg.Pool

const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/gp-bookings';

const pool = new Pool({
  connectionString
});

var moment = require('moment'); // require
moment().format()


app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

//const greetings = greet(pool);

//after ive instantiate my app ,configure , expressJs as handlebars(middleware)
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');




// get something back on the screen, one route
app.get("/",  function (req, res) {



  //flash warning message
  req.flash('info',);

  // // 'Flash Message Added'
  // let greet = {
  //   count: await greetings.overallCounter()
  // };

 // const greetedNames = await pool.query('select id, name,count as greets, time as "timeOfGreets" from greetings');


  // put it again the settingsbill data on screen , render it on second parameter:
  res.render("index", 
  //{
    //greet,
    // timeOfGreets,
   // names: await greetedNames.rows, title: "Home"
 // }
  );
});




































const PORT = process.env.PORT || 3014


app.listen(PORT, function () {
  console.log("app started at port:", PORT);

});









