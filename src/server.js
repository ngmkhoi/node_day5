const express = require('express');
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { SERVER, CORS } = require('./config/constants');
require('./config/database');
const router = require("./routes");
const responseFormat = require("./middlewares/responseFormat");
const notFound = require("./middlewares/notFound");
const exceptionHandler = require("./middlewares/exceptionHandler");

const port = process.env.PORT || SERVER.DEFAULT_PORT;
const host = process.env.HOST || SERVER.DEFAULT_HOST;

const server = express();

server.use(cors({
    origin: function (origin, callback) {
        if(!origin) return callback(null, true)

        if(CORS.ALLOWED_ORIGINS.indexOf(origin) !== -1){
            callback(null, true)
        }else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: CORS.ALLOWED_METHODS,
    credentials: true
}));

server.use(express.json());
server.use(cookieParser());
server.use(responseFormat);

server.get('/', (req, res) => {
    res.status(200).json({
        status: "healthy",
    })
});
server.use('/api', router);

server.use(notFound);
server.use(exceptionHandler)

server.listen(port, host, () => {
    console.log(`Listening on ${host}:${port}`);
})