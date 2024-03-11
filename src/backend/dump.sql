DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    balance INTEGER
);

DROP TABLE IF EXISTS stations CASCADE;
CREATE TABLE stations (
    station_id SERIAL PRIMARY KEY,
    station_name VARCHAR(255),
    longitude FLOAT,
    latitude FLOAT
);

DROP TABLE IF EXISTS trains CASCADE;
CREATE TABLE trains (
    train_id SERIAL PRIMARY KEY,
    train_name VARCHAR(255),
    capacity INTEGER
);

DROP TABLE IF EXISTS stops CASCADE;
CREATE TABLE stops (
    stop_id SERIAL PRIMARY KEY,
    train_id INTEGER REFERENCES trains(train_id),
    station_id INTEGER REFERENCES stations(station_id),
    arrival_time TIME,
    departure_time TIME,
    fare INTEGER,
    stop_order INTEGER
);
