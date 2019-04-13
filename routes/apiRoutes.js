const fs = require('fs');
const path = require('path');
const imagePath = path.resolve(__dirname, '..', 'public', 'images');
const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const json2csv = require("json2csv").parse;
const cloudinary = require("../config/cloudinary");

module.exports = function (app) {

    // FIND ALL observations
    app.get("/api/observations", function (req, res) {
        db.Observations.findAll({
            include: [{
                model: db.Users,
                attributes: ["userId", "firstName", "lastName", "username"]
            }]
        }).then(function (dbObs) {
            res.json(dbObs);
        });
    });

    // FIND ALL observations grouped by category
    app.get("/api/categories/:category", function (req, res) {
        db.Observations.findAll({
            where: {
                category: req.params.category
            },
            include: [{
                model: db.Users,
                attributes: ["userId", "firstName", "lastName", "username"]
            }]
        }).then(function (dbObs) {
            res.json(dbObs);
        });
    });

    // GET most recent ONE observation of each category by TIMESTAMP
    app.get("/api/:category/mostrecentone", function (req, res) {
        db.Observations.findAll({
            limit: 1,
            where: {
                category: req.params.category,

            },
            order: [["createdAt", "DESC"]],
            include: [{
                model: db.Users,
                attributes: ["username"]
            }]
        }).then(function (recentObs) {
            res.json(recentObs);
        });
    });

    // GET most recent FIVE observations of each category by TIMESTAMP
    app.get("/api/:category/mostrecentfive", function (req, res) {
        db.Observations.findAll({
            limit: 5,
            where: {
                category: req.params.category,

            },
            order: [["createdAt", "DESC"]],
            include: [{
                model: db.Users,
                attributes: ["username"]
            }]
        }).then(function (recentObs) {
            res.json(recentObs);
        });
    });

    // CREATE new observation
    app.post("/api/observations", function (req, res) {
      db.Observations.create(req.body)
          .then(function (dbObs) {
              if (req.body.pictureData) {
                  var base64Data = req.body.pictureData.replace(/^data:image\/[a-z]+;base64,/, '');
                  fs.writeFile(`${imagePath}/${req.body.pictureId}`, base64Data, 'base64', function (err) {
                      if (err) {
                          console.log(err);
                      }
                      res.json(dbObs);
                  });
              } else {
                  res.json(dbObs);
              }
          });
  });

    // DESTROY one observation
    app.delete("/api/observations", function (req, res) {
        db.Observations.destroy({
            where: {
                id: req.query.id
            }
        }).then(function (dbObs) {
            res.json(dbObs);
        });
    });

    // FIND observations for data request, convert to csv, and download client side
    app.get("/download", function (req, res) {
        db.Observations.findAll({
            where: {
                category: req.query.category,
                dateObs: {
                    [Op.between]: [req.query.minDate, req.query.maxDate]
                }
            }
        }).then(function (result) {
            let csv = json2csv(result, {
                fields: ["id", "userId", "pictureId", "dateObs", "timeObs", "latitude", "longitude", "category", "species", "speciesSciName", "speciesConfidence", "firstConfidence", "briefDescription", "extendedDescription"]
            });
            res.setHeader("Content-disposition", "attachment; filename=sensaisondownload.csv");
            res.setHeader("Content-Type", "text/csv");
            res.status(200).send(csv);
        }).done(function() {
            console.log("successful");
        })
    });

    // FIND ONE user's observations
    app.get("/api/userobservations", function (req, res) {
        db.Observations.findAll({
            where: {
                userId: req.query.userId
            }
        }).then(function (dbObs) {
            res.json(dbObs);
        });
    });

    // FIND ALL users
    app.get("/api/users", function (req, res) {
        db.Users.findAll({
            attributes: ["userId", "firstName", "lastName", "username"],
            include: [db.Observations]
        }).then(function (allusr) {
            res.json(allusr);
        });
    });

    // CREATE new user
    app.post("/api/users", function (req, res) {
        db.Users.create(req.body)
            .then(function (newusr) {
                res.json(newusr);
            });
    });

    // UPLOAD one picture to cloudinary
    app.post("https://api.cloudinary.com/v1_1/sensaison/image/upload", function(req, res) {
        console.log("REQ: " + req);
        console.log("REQ.QUERY: " + req.query);
        cloudinary.v2.uploader.upload(
            req.query.files.path,
            {
                type: "private",
                folder: req.query.tagUserIdVal,
                tags: [req.query.tagCategoryVal, req.query.tagDateObsVal, req.query.tagUserIdVal] 
            },
            function(err, res) {
                console.log("RES.PUBLIC_ID: " + res.public_id);
            }
        )
    });
}
