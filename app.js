const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const messageAPI = require("./controllers/messageAPIController");
const messageSSR = require("./controllers/messageSSRController");

//Important: will be discussed next week
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride('_method'))

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// SSR
// Route to render index.html with messages using EJS
app.get("/", messageSSR.renderMessages);

// API
// GET all Messages
app.get("/api/messages", messageAPI.getMessages);
// POST a new Message
app.post("/api/messages", messageAPI.addMessage);
// GET a single Message
app.get("/api/messages/:id", messageAPI.getMessage);
// DELETE a Message
app.delete("/api/messages/:id", messageAPI.deleteMessage);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
