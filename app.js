import express from "express";
import dotenv from "dotenv";

const express = require( "express" );
const app = express();

dotenv.config();
const port = process.env.SERVER_PORT; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );