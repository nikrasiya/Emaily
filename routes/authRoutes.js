const passport = require("passport");

// app object is an express object defined in index.js
// Hence using this trick, we are exporting to  use the same
// variable name as an object later

// Starting the Google Oauth Process
module.exports = app => {
  app.get(
    // when ever any user comes to this route
    "/auth/google",
    // we push the user to the OAuth flow, managed by passport
    // Middleware that will authenticate a request using the given strategy name,
    // with optional options and callback.
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // When user is sent back from the URL, we already have the code for the
  // user profile
  app.get("/auth/google/callback", passport.authenticate("google"), (req,res)=>{
    res.redirect('/surveys')
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
