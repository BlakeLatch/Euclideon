const express = require('express');
const session = require('express-session');
const cors = require("cors");
const mongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const app = express();
dotenv.config();
app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: false, httpOnly: false, unset: 'destroy',
  store: new mongoStore({ mongoUrl: process.env.EUCLIDEON_MONGO_URI }), cookie: { maxAge: 1 * 60 * 60 * 1000 }}));
app.use(cors({ "Access-Control-Allow-Origin": "*", }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

const MongoConnect = require("./Config/mongoConnect");
const data = require('./Models/ContentData')
var Controller = require('./Controller/contentController');
const droneData = require('./Models/droneSchema');

app.use(require('./routes'));

app.post("/api/createContent", async (req, res) => {

  await Controller.createContent(req.body)
    .then(data => res.send(data).status(201))
    .catch(err => res.send(err).status(500))
});

app.post("/api/addDroneContent", async (req, res) => {
  await Controller.addDroneContent(req.body)
  .then(data=> res.send(data).status(201))
  .catch(err => res.send(err).status(500))
});

app.get("/api/getContent", async (req, res) => {
  await Controller.getContent({}, {}, {})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
});

app.get("/api/getDroneContent", async (req, res) => {
  await Controller.getDroneContent({}, {}, {})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
});

app.post("/api/insertContent", async (req, res) => {
  const payload = req.body;
  if (payload === "") return;
  await Controller.insertContent(payload)
    .then((data) => res.status(201).send("Added: " + data))
    .catch((err) => res.status(400).send(err.message));
});

app.get("/api/findContent", async (req, res) => {
  const criteria = req.body;
  console.log(req.data)
  await Controller.getContent(criteria, {}, {})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(404).send(err));
});

app.put("/api/editContent", async (req, res) => {
  const criteria = req.body;
  console.log(criteria);
  console.log(Object.keys(criteria).length);
  console.log(criteria._id.length)
  if (criteria._id.length != 24 || Object.keys(criteria).length < 7) return res.status(400);
  await Controller.EditContent(criteria)
    .then((data) => res.send(data).status(204))
    .catch((err) => {
      res.send(err).status(500);
      console.log(err);
    });
});

app.delete("/api/deleteContent", async (req, res) => {
  const objectID = req.body.objToDelete;
  console.log("Delete request recived " + objectID);
  if (objectID.length != 24) return res.status(400);
  console.log(objectID.length)
  await Controller.deleteContent(objectID)
    .then((data) => {console.log(data+" +++++++++++"); res.send(data).status(204)})
    .catch((err) => res.send(err).status(400));
});

app.listen(process.env.PORT || 3000, console.log("Server is up and Running on port " + process.env.PORT));
