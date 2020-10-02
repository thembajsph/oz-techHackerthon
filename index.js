//set up flash for my warning messages
const flash = require('express-flash');
const session = require('express-session');
const gpBookings = require('./gpBookings')
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

app.use(express.static('public'));

//const greetings = greet(pool);

//after ive instantiate my app ,configure , expressJs as handlebars(middleware)
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');



// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
app.use(bodyParser.json());

const bookingInstance = gpBookings(pool);

// const bookings = [];
var ticket = 0;

// console.log(bookings)
// get something back on the screen, one route
app.get("/", async function (req, res) {



	//flash warning message
	req.flash('info',);


	// // 'Flash Message Added'

	// const greetedNames = await pool.query('select id, name , day, id as bookings,  arriving_on  as "timeOfGreets" from drbooking')

	// put it again the settingsbill data on screen , render it on second parameter:
	res.render("index",
		{
			// bookings : greetedNames.rows,

			title: "Home"
		}
	);
});


app.get('overview', function (req, res) {
	res.render('grid');
})


app.get("/bookings/:name", async function (req, res) {
	const currentName = req.params.name;

	//
	const greetedNames = await pool.query('select id, name, day, id as bookings,  arriving_on  as "timeOfGreets" from drbooking where name = $1', [currentName])

	// put it again the settingsbill data on screen , render it on second parameter:
	res.render("index",
		{
			bookings: greetedNames.rows,

			title: "Home",
			name: currentName
		}
	);
});



app.post("/booking", async function (req, res) {

	const day = req.body.day
	const name = req.body.name;
	const arriving_on = req.body.time;

	var obj = {
		name,
		day,
		arriving_on
	}

	await bookingInstance.addBooking(obj)

	res.redirect("/bookings/" + name)

})

app.get("/confirm/:id", async function (req, res) {
	const name = req.body.name;
	const greetedNames = await pool.query('select id from drbooking where id = $1', [req.params.id]);


	console.log("greeted names: " + greetedNames);
	 
	res.render("confirm", { num: greetedNames.rows[0].id })
})






const PORT = process.env.PORT || 3014
app.listen(PORT, function () {
	console.log("app started at port:", PORT);




});
























		// 	} else {

		// 		function validate(value, result) {
		// 			if (!value) {
		// 				return result;
		// 			}
		// 			return {};
		// 		}

		// 		const daysInvalid = validate(days, {
		// 			style: "is-invalid",
		// 			message: "Enter a valid day"
		// 		});

		// 		const bookingsNameInvalid = validate(name, {
		// 			style: "is-invalid",
		// 			message: "Enter a valid day"
		// 		});

		// 		const arrivingOnInvalid = validate(arrivingOn, {
		// 			style: "is-invalid",
		// 			message: "Please select a arrival day"
		// 		});

		// 	}

		// })

		// && Number(req.body.days);