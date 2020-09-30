const flash = require('express-flash');
const session = require('express-session');
const gpBookings = require('./gp-bookings')
const express = require("express");
const app = express();


const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');



const pg = require('pg');
const Pool = pg.Pool

const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/gp-bookings';

const pool = new Pool({
    connectionString
});

var moment = require('moment');
moment().format()


app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.use(express.static('public'));

//const greetings = greet(pool);

//after ive instantiate my app ,configure , expressJs as handlebars(middleware)
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');



// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
app.use(bodyParser.json());



// get something back on the screen, one route
app.get("/", function (req, res) {



    //flash warning message
    req.flash('info',);

    
    res.render("index",
        
    );
});

app.post("/booking", async function (req, res) {        

    const days = req.body.timestamp
    const name = req.body.name;
    const arrivingOn = req.body.day;

    if (days && name && arrivingOn) {

        await bookings.addBooking({
            days,
            name,
            arrivingOn
        })

        res.redirect("/");

    } else {

        function validate(value, result) {
            if (!value) {
                return result;
            }
            return {};
        }

        const daysInvalid = validate(days, {
            style: "is-invalid",
            message: "Enter a valid day"
        });

        const bookingsNameInvalid = validate(name, {
            style: "is-invalid",
            message: "Enter a valid day"
        });

        const arrivingOnInvalid = validate(arrivingOn, {
            style: "is-invalid",
            message: "Please select a arrival day"
        });

        //const bookings = await bookings.getBookings();


        res.render("index", {
            name,
            days,
            bookings,
            daysInvalid,
            arrivingOnInvalid,
            bookingsNameInvalid
        });

    }

});

const PORT = process.env.PORT || 3011
app.listen(PORT, function () {
    console.log("app started at port:", PORT);

})



