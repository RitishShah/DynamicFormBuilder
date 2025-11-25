const http = require('http');
const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require('./config/db');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => { console.log(`Shutting Down Server for Handling Uncaught Exception : ${err.message}`); });

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 7000;
const HOST = '0.0.0.0';

const server = http.createServer(app);

connectDatabase();

server.listen(PORT, HOST, () => {
    console.log(`Server is running on ${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting Down Server for the ${err.message}`);
    server.close(() => { process.exit(1); });
});