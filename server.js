const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
var wineMethods = require("./models/wineMethods");
var Wines = require("./models/wine");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
// app.get('/', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });

app.get("/", (req, res, next) => {
  wineMethods
    .getAll()
    .then(items => {
      // res.sendFile("home", { wines: JSON.stringify(items) });
      res.send({ express: items });
    })
    .catch(err => {
      return next(err);
    });
});

app.get("/get", (req, res, next) => {
  wineMethods
    .getOne(req.query._id)
    .then(items => {
      res.send({ express: items });
    })
    .catch(err => {
      return next(err);
    });
});

app.get("/delete", (req, res, next) => {
  wineMethods
    .killOne(req.query._id)
    .then(items => {
      res.send({ express: items });
    })
    .catch(err => {
      return next(err);
    });
});

app.post("/add", (req, res, next) => {
  if (!req.body._id) {
    let wine = new Wines(
      // {
      //   _id: req.body._id
      // },
      {
        vinyard: req.body.vinyard,
        name: req.body.name,
        grape: req.body.grape,
        grapes: req.body.grapes,
        year: req.body.year,
        place: req.body.place,
        area: req.body.area,
        country: req.body.country,
        appellation: req.body.appellation,
        description: req.body.description,
        funfact: req.body.funfact,
        timestamp: Date.now(),
        price: req.body.price,
        mise: req.body.mise,
        lastUpdated: Date.now(),

        color: req.body.color,
        status: req.body.status,
        picture: req.body.picture,
        coravin: req.body.coravin
      }
    );
    // wine.save().then(item => res.json(item));
    wine.save((err, newWine) => {
      if (err) return next(err);
      return res.json({ updated: 0, _id: newWine._id });
    });
  } else {
    Wines.updateOne(
      { _id: req.body._id },
      {
        vinyard: req.body.vinyard,
        name: req.body.name,
        grape: req.body.grape,
        grapes: req.body.grapes,
        year: req.body.year,
        place: req.body.place,
        area: req.body.area,
        country: req.body.country,
        appellation: req.body.appellation,
        description: req.body.description,
        funfact: req.body.funfact,
        timestamp: Date.now(),
        price: req.body.price,
        mise: req.body.mise,
        lastUpdated: Date.now(),

        color: req.body.color,
        status: req.body.status,
        picture: req.body.picture,
        coravin: req.body.coravin
      },
      (err, result) => {
        if (err) return next(err);
        res.json({ updated: result.nModified, _id: req.body._id });
      }
    );
  }
});
