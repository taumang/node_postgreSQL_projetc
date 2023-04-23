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
    if (err) 
        console.error('Error connecting to PostgreSQL server', err.stack);
     else 
        console.log('Connected to PostgreSQL server');
    
});

// Create a server object
const server = https.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    //adding INSERT query to add a new record to the PostgreSQL database
    const query = {
        text: `
        INSERT 
        INTO bookkeeping_info 
        (business_name, revenue, expenses, profit, created_at) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id`,
        values: ['My Business', 100000.00, 75000.00, 25000.00, new Date()]
    };

    client.query(query,(error,result)=>{
                        if(error)
                            console.error('Error running INSERT query', error.stack);
                        else
                            res.end(`New record created with ID: ${result.rows[0].id}`);
                        
                    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at https://localhost:${port}/`);
});