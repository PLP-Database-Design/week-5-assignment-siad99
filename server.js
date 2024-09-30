// import our dependencies
const express = require('express')
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv')

// cors and ejs


// configure enviroment variables
dotenv.config();

// create aconnection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


// test the connection
db.connect((err) => {
    // connection is not succesfull
    if(err) {
       return  console.log("Error connecting to the database:",err)
    }

    // connection is successfull
    console.log("successfully connected to MySQL: ", db.threadId);
    app.get('/', (req,res) => {
        res.send('hello World')
    })
    

})

// Retrieve all patients
app.get('', (req,res) => {
    const getPatients = "SELECT * FROM PATIENTS"
    db.query(getPatients, (err,data) =>{
        // if i have an error
        if (err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    })
}) 


// Retrieve patients by first name
app.get('/patients/:first_name', (req, res) => {
    const firstName = req.params.first_name;
    const getPatientsByFirstName = "SELECT * FROM PATIENTS WHERE first_name = ?";
    
    db.query(getPatientsByFirstName, [firstName], (err, data) => {
        // If there's an error
        if (err) {
            return res.status(400).send({ message: "Failed to get patients", error: err });
        }

        // Send the retrieved data
        res.status(200).send(data);
    });
});


// Retrieve all providers
app.get('', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";
    
    db.query(getProviders, (err, data) => {
        // If there's an error
        if (err) {
            return res.status(400).send("Failed to get providers");
        }

        // Send the data as a response
        res.status(200).send(data);
    })
});



// start and listen to the server
app.listen(3300, () => {
    console.log(`server is running on port 3300...`)
})