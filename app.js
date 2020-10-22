const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const socketServer = require("./socket");
var cors = require('cors')

var PORT = process.env.PORT || 5000;

// Routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

/**
 * Server creation
 */
const server = app.listen(PORT);
/**
 * Initializing the socket
 */
const io = require("./socket").init(server);
io.on("connection", () => {
  console.log("Connected");
});

const socket = socketServer.getIO();

/**
 * Send Logs
 */
app.post("/send",(req,res) => {
    const params = req.body;
    socket.emit('log',params);
    res.send({
        status : true,
        data : params,
        message : "Log has been sent"
    })
});


// Invalid routes
app.use((req, res, next) => {
  res.status(404).send({
    status: false,
    message: "Invalid request",
  });
});
