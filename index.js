const https = require('https');
const { Client } = require('pg');

// Define the port number
const port = 3000;

// Create a new PostgreSQL client
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'bookkeeping_recordsdb',
    password: '09Taumang',
    port: 5432
});

// Connect to the PostgreSQL server
client.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL server', err.stack);
    } else {
        console.log('Connected to PostgreSQL server');
    }
});

// Create a server object
const server = https.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!');
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at https://localhost:${port}/`);
});