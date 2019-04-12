const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    async (accessToken, refresh, profile, done) => {
      // console.log("accessToken: ", accessToken);
      // console.log("refresh: ", refresh);
      // console.log("profile: ", profile);
      // console.log("done: ", done);
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given
        // profile ID
        return done(null, existingUser);
      }
      // we dont have a record with this ID
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
