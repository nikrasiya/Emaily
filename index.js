const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); // cookie-based authentication.
const passport = require("passport");

// returns a key object
const keys = require("./config/keys");
// connecting to remote mongoDb
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// express instance
const app = express();

// !!!! IMPORTANT !!!
// Order of the require statement is important.
// First make the model class, then use passport to log user
//
// We are not returning anything from the files.
// Hence we need not assign this to any variables.
require("./models/User");
require("./services/passport");

// Middleware makes adjustments
// Cookie-Session extracts cookie-data


// cookie session is used to identify between requests
// on HTTP because HTTP is stateless
// During response we set the header with the 'set-cookie'.
// The cookie-token is stored in the browsers memory.
// It is now sent very time a request is made to the server.
// Cookie will last for 30 days
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// Passport middleware to pull user id out of cookie data
// Passport's primary initialization middleware.
// This middleware must be in use by the Connect/Express application for
// Passport to operate.
app.use(passport.initialize());
// Middleware that will restore login state from a session.
app.use(passport.session());

// passing app instance to the authRoutes function
require("./routes/authRoutes")(app);

// listen for environment port or local port
const PORT = process.env.PORT || 5000;

// server is listening on
app.listen(PORT, () => {
  console.log(`Listening on port 5000`);
});
