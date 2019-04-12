const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const json2csv = require("json2csv").parse;
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const archiver = require("archiver");


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
                res.json(dbObs);
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

    // FIND observations for data request WITH PICTURES
    app.get("/download-with-pictures", function (req, res) {
        db.Observations.findAll({
            where: {
                category: req.query.category,
                dateObs: {
                    [Op.between]: [req.query.minDate, req.query.maxDate]
                }
            }
        }).then(function(result) {

            

            for (let i=0; i<result.length; i++) {

                let picForDownload ="https://res.cloudinary.com/sensaison/image/" + result[i].pictureId;

            }

            let csv = json2csv(result, {
                fields: ["id", "userId", "pictureId", "dateObs", "timeObs", "latitude", "longitude", "category", "species", "speciesSciName", "speciesConfidence", "firstConfidence", "briefDescription", "extendedDescription"]
            });

            

            res.setHeader("Content-disposition", "attachment; filename=sensaisondownload_withpics.zip");
            res.setHeader("Content-Type", "application/octet-stream");
            res.status(200).send(zip);
        })
    });




    // FIND observations for data request, convert to csv, and download client side NO PICTURES
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
                fields: ["id", "userId", "dateObs", "timeObs", "latitude", "longitude", "category", "species", "speciesSciName", "speciesConfidence", "firstConfidence", "briefDescription", "extendedDescription"]
            });
            res.setHeader("Content-disposition", "attachment; filename=sensaisondownload_nopics.csv");
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
            req.body.files,
            {
                type: "private",
                folder: req.body.tagUserIdVal,
                tags: [req.body.tagCategoryVal, req.body.tagDateObsVal, req.body.tagUserIdVal] 
            },
            function(err, res) {
                console.log("RES.PUBLIC_ID: " + res.public_id);
            }
        )
    });
}
