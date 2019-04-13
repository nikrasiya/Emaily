const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

// one argument means we are trying to FETCH
// something from mongoose
const User = mongoose.model("users");

// Registers a function used to serialize user objects into the session.
// Will be later used for 'SET-COOKIE'
passport.serializeUser((user, done) => done(null, user.id));

// Registers a function used to deserialize user objects out of the session.
// Used to turn back into a user for a GET request
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  // Creating new Google Strategy
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    // accessToken - token which gives modification
    // refreshToken - automatically update accessToken
    // done - we are complete now, proceed with the authentication
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given
        // profile ID
        return done(null, existingUser);
      }
      // Model Instance
      // we dont have a record with this ID
      // Saves this document to the mongoDB
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
