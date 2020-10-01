   CREATE TABLE drbooking (
    id serial not null PRIMARY KEY,
    name VARCHAR ( 50 ) UNIQUE NOT NULL,
    day VARCHAR ( 50 ) NOT NULL,
    arriving_on text NOT NULL

  );