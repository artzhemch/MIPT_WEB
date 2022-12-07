const express = require("express"),
      bodyParser = require("body-parser"),
      path = require("path"),
      webpush = require("web-push");

const vapidKeys = webpush.generateVAPIDKeys(),
      port = 1234,
      mail = "artzhemch",
      publicKey = "MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAa5IKqT7m4KcJ0np38M1Jaa25HLYYDJuXr+O0YfmDzLrKidFOaXBKgEqrLuomZMBQ6SIeg/aPv2j6QqbFXi6+0QIDAQAB",
      privateKey = "MIIBOAIBAAJAa5IKqT7m4KcJ0np38M1Jaa25HLYYDJuXr+O0YfmDzLrKidFOaXBK\
      gEqrLuomZMBQ6SIeg/aPv2j6QqbFXi6+0QIDAQABAkAFvxZ8thSFWccHjG1N2tma\
      IKKr6vpb6g/vYH2pYjftPtdHQCeK9k7UKS19ISAwhPygshcGehroKw77e88WPvyx\
      AiEAxPz6M8KKbQEbqSuExcpMZH+sCaiN5yq1bjRDmK0gKAUCIQCLy57Qt5SkWrH+\
      s0hTGgmqoBqgVRMBL0ihu9kUHl5xXQIgLj8eFmzDxteNwOegojbePHHk19ekiPLz\
      6U2H2R48AGkCIA5KptXXrs6OpxvO4Fn+k3ZqH868Y9D/MIG4Xpz77dPRAiBNVUqk\
      22JvZkFLK/OKsINjXsqPGkLvesCaolswUOyCHg==";

webpush.setVapidDetails("mailto:" + mail, publicKey, privateKey);
const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/sendpush", (req, res) => {
  res.status(201).json({}); 
  webpush.sendNotification(req.body, JSON.stringify({
    title: "Notification",
    body: "Text"
  }))
  .catch((err) => { console.log(err); });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`)
});