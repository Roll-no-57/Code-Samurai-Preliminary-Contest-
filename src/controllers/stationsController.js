const pool = require('./pool');

// URL = '/api/stations/'
async function create_station(req, res, next) {
    const { station_id, station_name, longitude, latitude } = req.body;

    try {
        const newStation = await pool.query(
            "INSERT INTO stations (station_id, station_name, longitude, latitude) VALUES ($1, $2, $3, $4)",
            [station_id, station_name, longitude, latitude]
        );
        res.status(201).json({ station_id, station_name, longitude, latitude });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}

// URL = '/api/stations/'
async function get_stations(req, res, next) {
    try {
        const stations = await pool.query("SELECT * FROM stations");
        res.status(200).json(stations.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}


// URL = '/api/stations/{station_id}/trains'
// get all trains that stop at a station
async function get_station_trains(req, res, next) {

    const station_id = req.params.station_id;
    console.log('Retrieving trains at station:', station_id);

    try {

        const sql = `select * from stations where station_id = $1;` 

        const resStation = await pool.query(sql, [station_id]);
        const restation = resStation.rows[0];

        if(!restation){
            return res.status(404).send({ "message": "station is with id: " + station_id  +" was not found"});
        }


        const query = `
            SELECT trains.train_id, stops.arrival_time, stops.departure_time
            FROM trains
            JOIN stops ON trains.train_id = stops.train_id
            WHERE stops.station_id = $1
            ORDER BY 
                stops.departure_time NULLS FIRST, 
                stops.arrival_time NULLS FIRST, 
                trains.train_id;
        `;


        const result = await pool.query(query, [station_id]);
        const trains = result.rows;

        
        const response = {
            station_id: station_id,
            trains: trains
        };

        console.log('Retrieved trains:', response);
        return res.status(200).json(response);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }


}




module.exports = {
    create_station,
    get_stations,
    get_station_trains,
};
