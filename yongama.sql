sudo -u postgres createdb gp-bookings;
sudo -u postgres createuser yongama -P;

sudo -u postgres psql;
grant all privileges on database gp-bookings to yongama;


export DATABASE_URL=postgresql://yongama:pg123@localhost:5432/gp-bookings


