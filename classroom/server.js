const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

const session = require("express-session");
const flash = require("connect-flash");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configure session middleware
app.use(session({
  secret: "mysupersecret", // used to sign the session ID cookie
  resave: false,           // prevents session being saved back to store if not modified
  saveUninitialized: true, // saves a session that is new but not modified
  cookie: { secure: false } // secure should be set to true if using HTTPS
}));

app.get("/test", (req, res) => {
  res.send("Test successful!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
