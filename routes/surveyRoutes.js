const moongose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const Survey = moongose.model("surveys");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
require("../services/sendgrid_webhook");

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    // current user is on req.user
    // find surveys which match with the current user
    const {
      user: { id }
    } = req;

    const surveys = await Survey.find({ _user: id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      // Done to update the header in the client side !!! IMPORTANT !!!
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // sendgrid posts the click event (web hook)
  app.post("/api/surveys/webhooks", (req, res) => {
    // returns an object with the wildcard as the key
    const p = new Path("/api/surveys/:surveyId/:choice");

    // map over list of events
    // req.body is the list of events from sendgrid
    _.chain(req.body)
      .map(event => {
        const { email, url } = event;
        // extract the route from URL
        const pathname = new URL(url).pathname;
        // if could not extract both survey id and choice
        // p.test will be null
        const match = p.test(pathname);
        // if object with survey id and choice was created
        // get the email id
        if (match) {
          const { surveyId, choice } = match;
          return { email, surveyId, choice };
        }
      })
      // remove elements that are undefined
      .compact()
      // remove duplicate events
      .uniqBy("email", "surveyId")
      // events is an array of objects. Each event object has a
      // surveyId, email, and choice properties.
      .each(event => {
        const { surveyId, email, choice } = event;
        // !!! IMPORTANT !!!
        // This instruction is processed in mongoDB
        // Find and update one collection in the Survey model class
        Survey.updateOne(
          {
            // find an survey with the id
            _id: surveyId,
            recipients: {
              // match the element
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            // if the event matches then
            // increment the choice by 1
            $inc: { [choice]: 1 },
            // set the respond property to yes
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          } // execute the query
        ).exec();
      })
      .value();
    // Though the Survey.updateOne is an async operation we
    // dont have async await because sendgrid does not care about
    // the data. We do not need the async await keyword.
    // send to send grid
    res.send({});
  });

  app.get("/api/surveys/:surveyId:/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });
};
