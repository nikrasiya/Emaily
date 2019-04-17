const localtunnel = require("localtunnel");
const colors = require("colors");

setTimeout(() => {
  localtunnel(5000, { subdomain: "emaily-react-app" }, (err, tunnel) => {
    console.log(colors.rainbow("[local tunnel] running on -> ") + tunnel.url);
  });
}, 2000);

// HTTP POST URL
// https://emaily-react-app.localtunnel.me/api/surveys/webhooks