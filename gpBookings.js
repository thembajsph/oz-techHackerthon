
module.exports = function gpBookings(pool) {

    var bookedNames = [];
  
    function setName(name) {
  
      if (bookedNames.some(person => person.user === name)) {
        for (let key of bookedNames) {
          // console.log(key.counter + 1);
  
          if (key.user === name) {
            key.counter++;
          }
        }
  
  
  
      } else {
        bookedNames.push({
          user: name,
          counter: 1
        })
      }
    };


async function addBooking(params) {

    const INSERT_QUERY = "insert into drbooking (name, day, arriving_on) values ($1, $2, $3)";
    await pool.query(INSERT_QUERY, [params.name, params.day, params.arriving_on]);

}

async function getBookings() {
    const bookings = await pool.query(`select id, name, 
        day as days, 
        arriving_on as "arriving_on" from drbooking`);

    return bookings.rows;
}


async function enterName(name) {
  const isAdded = await getCountForUser(name) > 0;
  if (isAdded) {
    await pool.query('UPDATE drbooking SET id = id + 1 WHERE name = $1', [name]);
    
  }

  await pool.query('INSERT INTO drbooking (name, id) values($1,$2)', [name, 1])
};


async function existDbAndCount(name) {
  try {

    const updateQuery = await pool.query('SELECT name FROM drbooking WHERE name = $1', [name]);
    return updateQuery;
  } catch (error) {
    console.log(error.name)
    console.log(error.message)
    console.log(error.stack)
  }

}

async function getName() {
  let names = await pool.query('SELECT name FROM drbooking')
  console.log(names);
  return names.rows;
}

//must used what we have in local storage(key value pairs in storage) object in storage .

async function overallCounter() {
  let id = await pool.query('SELECT id FROM drbooking');
  console.log(id.rowCount);
  return id.rowCount;
}

// function hasNumbers(name) {

// };
function clear() {
  bookedNames = {};
}


const getCountForUser = async (name) => {
  let selectQuery = await pool.query('SELECT id FROM drbooking WHERE name = $1 ', [name]);
  if (selectQuery.rows[0] && selectQuery.rows[0].id) {
    return selectQuery.rows[0].id;
  }

  //return 0;
}

async function resetFtn() {

  let restart = await pool.query('DELETE FROM drbooking ');
  return restart;
};


























// async function filterBookings (criteria){
//     if (criteria === "three") {
//         const LESS_OR_EQL_THAN_3 = `
//             select id, name, staying_for as days, 
//                     arriving_on as "arrivingOn" 
//             from booking 
//                 where staying_for <= 3`;

//         const result = await pool.query(LESS_OR_EQL_THAN_3);
//         return result.rows;

//     } else if (criteria === "more") {
//         const MORE_THAN_3 = `
//             select id, name, staying_for as days, 
//                     arriving_on as "arrivingOn" 
//             from booking 
//                 where staying_for > 3`;

//         const result = await pool.query(MORE_THAN_3);
//         return result.rows;
//     }  else {
//         return getBookings();
//     }
// }

return  {
    addBooking,
    getBookings,
    overallCounter,
    getCountForUser,
    clear,
    existDbAndCount,
    enterName,
    getName,
    setName,
    resetFtn

}


}











    //filterBookings


// insert into DrBooking (name, day, arriving_On )
// 	values ('Mahlatsi', 'Monday', '2020-10-07 11:12:15-09');


//     create table  DrBookings(
//         gp-bookings(>  id serial not null primary key,
//         gp-bookings(>  name text,
//         gp-bookings(>  day text,
//         gp-bookings(>  arrivingOn TIMESTAMP
//         gp-bookings(> );
        

//         create table drBooking(
//             id serial not null primary key,
//             name text,
//             day text,
//             arriving_on TIMESTAMP
//         );