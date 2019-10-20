var express = require("express");
var Colleges = require("../models/college");

var router = express.Router();

router.route("/")
  .get((req, res, next) => {
    Colleges.find({})
      .then((colleges) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(colleges);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  

  .post((req, res, next) => {
    console.log(req.body);
    Colleges.create(req.body)
      .then(
        college => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(college);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported!");
  })

  .delete((req, res, next) => {
    Colleges.deleteMany({})
      .then(
        reply => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(reply);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

  router.route("/:id")
  .get((req, res, next) => {
    Colleges.findById(req.params.id)
      .then(
        college => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(college);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported!");
  })
  .put((req, res, next) => {
    Colleges.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, useFindAndModify: false }
    )
      .then(
        college => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(college);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Colleges.findByIdAndDelete(req.params.id)
      .then(
        reply => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(reply);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

module.exports = router;