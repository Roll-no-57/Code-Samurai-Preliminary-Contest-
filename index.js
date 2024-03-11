/*
 * MODULE DEPENDENCIES
 */

const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const rootRouter = require("./src/routes/root");
const usersRouter = require("./src/routes/users");
const walletRouter = require("./src/routes/wallet");
const stationsRouter = require("./src/routes/stations");
const routesRouter = require("./src/routes/routes");
const ticketsRouter = require("./src/routes/tickets");
const trainsRouter = require("./src/routes/trains");

const app = express();

// BIN/WWW START
var debug = require("debug")("preliminary:server");
var http = require("http");
require("dotenv").config();

var port = normalizePort(process.env.APP_PORT || "8000");
app.set("port", port);

var server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
    debug(`Server running at http://localhost:${addr.port}`);
}

// BIN/WWW END

/*
 * USE MIDDLEWARES
 */

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
 * SETUP ROUTES
 */

app.use("/", rootRouter);
app.use("/api", usersRouter);
app.use("/api", walletRouter);
app.use("/api", stationsRouter);
app.use("/api", routesRouter);
app.use("/api", ticketsRouter);
app.use("/api", trainsRouter);


/*
 * ERROR HANDLING (MUST BE LAST MIDDLEWARE)
 * DON'T PUT ANY ROUTE OR MIDDLEWARE AFTER THIS
 */

/*
// 404 handler middleware (when no route is matched)
app.use(function (req, res, next) {
    // Create a 404 Not Found error
    const notFoundError = createError(404);

    // Forward the error to the error handler middleware
    next(notFoundError);
});

// error handler middleware
app.use(function (err, req, res, next) {
    // Set locals, providing error details in development environment
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Set the HTTP status code based on the error status or default to 500 (Internal Server Error)
    res.status(err.status || 500);

    // Determine the response format based on the request's Accept header
    const acceptHeader = req.get("Accept");

    // Send a JSON response for API requests
    if (acceptHeader && acceptHeader.includes("application/json")) {
        res.json({ error: err.message });
    } else {
        // For other requests, send a plain text response
        res.send("Internal Server Error");
    }
});
*/

module.exports = app;
