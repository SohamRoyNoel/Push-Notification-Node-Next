/**
 * generate vapid : ./node_modules/.bin/web-push generate-vapid-keys
 */
const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey =
  "BFMZNJp_y-2fPrEkNFWIBAO5pr-h_ATUCPsk7o_UcEYm8Py-lVFto-6IawJcRtGCOPOcTA_fSgIvz4vOecky3sg";
const privateVapidKey = "uXn-h3SthIntlrPwH8K0m0ds_xmWM3XXTDrCozD2gaQ";

webPush.setVapidDetails(
  "mailto:test@example.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {
  
  const { subscription } = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({
    title: "Push notifications with Service Workers",
    body: "No data for you"
  });
  console.log("___", subscription);
  webPush
    .sendNotification(subscription, payload)
    .then(e => {
      console.log(e);
    })
    .catch((error) => console.error(error));
});

app.set("port", 4000);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
