const pool = require("./pool");

/*
Users can use their wallet balance to purchase tickets from stations A to B. The cost is calculated as the sum of
the fares for each pair of consecutive stations along the route. Upon successful purchase, your API should
respond with the station in order visited by one or more trains and the remaining wallet balance. If the wallet
does not have sufficient funds, respond with an error specifying the shortage amount. If it is impossible to
reach station B from station A within the day or due to a lack of trains, respond with an error specifying that no
tickets are available.
Note: The user may want to change the train at a particular station for a cheaper trip. Partial scoring will be
awarded if your API fails to find an optimal route. You can assume that the start and destination stations will
always differ, and the user must complete the trip within the current day.
Request Specification
URL: /api/tickets
Method: POST
Request model:
{
"wallet_id": int, # user's wallet id (same as user id)
"time_after": string, # time (24 hours hh:mm) after which user
wants to purchase a ticket
"station_from": int, # station_id for the starting station
"station_to": int # station_id for the destination station
}
Successful Response
Upon successful operation, your API must return a 201 status code with the generated ticket ID, remaining
balance, wallet ID, and a list of all stations in order of visits. You should also include each station's train ID and
arrival and departure schedules in the output object. Departure time should follow the same time format as in
the input model. For the first station, the arrival time should be null, and for the last station, the departure
time should be null.
Response status: 201 - Created
Response model
{
"ticket_id": int, # generate a unique integer ticket
ID
"wallet_id": int, # user's wallet id (same as user
id)
"balance": integer, # remaining balance
"stations": [
{
"station_id": integer, # station's numeric id
"train_id": integer, # train's id user is riding
"arrival_time": string, # arrival time
"departure_time": string # departure time
},
...
]
}
Failed Response
Insufficient balance
If the wallet has insufficient balance for purchasing the ticket, respond with HTTP 402 - Payment Required and
a message showing the shortage amount.
Response status: 402 - Payment Required
Response model
{
"message": "recharge amount: {shortage_amount} to purchase the thicket"
}
Replace {shortage_amount} with the amount the user is short of the ticket's cost.
Note: This amount may vary depending on whether you can find an optimal-cost route for the user. Suboptimal
solutions may be awarded with partial scores.
Unreachable station
If it is impossible to reach the destination station from the starting station, output a message with HTTP 403 -
Forbidden and a message for the user.
Response status: 403 - Forbidden
Response model
{
"message": "no ticket available for station: {station_from} to station:
{station_to}"
}
Replace {station_from} and {station_to} as specified in the input model.
*/

// URL = '/api/tickets/'
async function get_tickets(req, res) {
    res.send("get_tickets");
    const { wallet_id, time_after, station_from, station_to } = req.body;
    const query = `SELECT * FROM tickets WHERE wallet_id = $1 AND time_after = $2 AND station_from = $3 AND station_to = $4`;
    const values = [wallet_id, time_after, station_from, station_to];
    try {
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return res.status(403).json({ message: `no ticket available for station: ${station_from} to station: ${station_to}` });
        }
        return res.status(201).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
}

module.exports = {
    get_tickets,
};
