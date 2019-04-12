const express = require("express");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// express instance
const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

// listen for environment port or local port
const PORT = process.env.PORT || 5000;
// server is listening on
app.listen(PORT, () => {
  console.log(`Listening on port 5000`);
});

// Heroku deployment
// https://pure-thicket-94708.herokuapp.com/
// Git
// https://git.heroku.com/pure-thicket-94708.git
