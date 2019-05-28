const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const json2csv = require("json2csv").parse;
const zipURLs = require("./zipURLs");
require("archiver");
const Passport = require("../config/passportStrategy");
const ensureLoggedIn = require("connect-ensure-login");
// const fs = require("fs");

module.exports = (app) => {

    // FIND ALL observations
    app.get("/api/observations", (req, res) => {
        db.Observations.findAll({
            include: [{
                model: db.Users,
                attributes: ["userId", "firstName", "lastName", "username"]
            }]
        }).then(dbObs => {
            res.json(dbObs);
        });
    });

    // FIND ALL observations grouped by category
    app.get("/api/categories/:category", (req, res) => {
        db.Observations.findAll({
            where: {
                category: req.params.category
            },
            include: [{
                model: db.Users,
                attributes: ["userId", "firstName", "lastName", "username"]
            }]
        }).then(dbObs => {
            res.json(dbObs);
        });
    });

    // GET most recent ONE observation of each category by TIMESTAMP
    app.get("/api/:category/mostrecentone", (req, res) => {
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
        }).then(recentObs => {
            res.json(recentObs);
        });
    });

    // GET most recent FIVE observations of each category by TIMESTAMP
    app.get("/api/:category/mostrecentfive", (req, res) => {
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
        }).then(recentObs => {
            res.json(recentObs);
        });
    });

    // CREATE new observation
    app.post("/api/observations", (req, res) => {
                db.Observations.create(req.body)
            .then(dbObs => {
                res.json(dbObs);
            });
    });

    // DESTROY one observation
    app.delete("/api/observations", (req, res) => {
        db.Observations.destroy({
            where: {
                id: req.query.id
            }
        }).then(dbObs => {
            res.json(dbObs);
        });
    });

    // FIND observations for data request WITH PICTURES
    app.get("/download-with-pictures", (req, res) => {
        db.Observations.findAll({
            where: {
                category: req.query.category,
                dateObs: {
                    [Op.between]: [req.query.minDate, req.query.maxDate]
                }
            } 
        }).then(async results => {
            const csv = json2csv(results, {
                fields: [
                    "id",
                    "userId",
                    "pictureId",
                    "dateObs",
                    "timeObs",
                    "latitude",
                    "longitude",
                    "category",
                    "species",
                    "speciesSciName",
                    "speciesConfidence",
                    "firstConfidence",
                    "briefDescription",
                    "extendedDescription"
                ]
            });

            let picsDownloadArr = results.map(r => `https://res.cloudinary.com/sensaison/image/upload/${r.pictureId}.jpg`);

            try {
                let zip = await zipURLs(picsDownloadArr, csv);
                res.setHeader("Content-disposition", "attachment; filename=sensaisondownload_withpics.zip");
                res.setHeader("Content-Type", "application/zip, application/octet-stream");
                res.status(200);
                zip.pipe(res);
            }
            catch (err) {
                res.status(404).send(err);
            }
        }).catch(err => {
            res.status(404).send(err);
        });
    });

    // FIND observations for data request, convert to csv, and download client side NO PICTURES
    app.get("/download", (req, res) => {
        db.Observations.findAll({
            where: {
                category: req.query.category,
                dateObs: {
                    [Op.between]: [req.query.minDate, req.query.maxDate]
                }
            }
        }).then(result => {
            let csv = json2csv(result, {
                fields: [
                    "id",
                    "userId",
                    "dateObs",
                    "timeObs",
                    "latitude",
                    "longitude",
                    "category",
                    "species",
                    "speciesSciName",
                    "speciesConfidence",
                    "firstConfidence",
                    "briefDescription",
                    "extendedDescription"
                ]
            });
            res.setHeader("Content-disposition", "attachment; filename=sensaisondownload_nopics.csv");
            res.setHeader("Content-Type", "text/csv");
            res.status(200).send(csv);
        }).done(() => {
            console.log("successful download with no pictures");
        })
    });

    // FIND ONE user's observations
    app.get("/api/userobservations", (req, res) => {
        db.Observations.findAll({
            where: {
                userId: req.query.userId
            }
        }).then(function (dbObs) {
            res.json(dbObs);
        });
    });

    // FIND ALL users
    app.get("/api/users", (req, res) => {
        db.Users.findAll({
            attributes: ["userId", "firstName", "lastName", "username"],
            include: [db.Observations]
        }).then(allusr => {
            res.json(allusr);
        });
    });

    // CREATE new user
    app.post("/api/users", (req, res) => {
        db.Users.create(req.body)
            .then(newusr => {
                res.json(newusr);
            });
    });

    /***********************
    * USER AUTHENTICATION
    ************************/
   
    app.post('/auth/openidconnect', Passport.authenticate('openid-client'));

    app.get('/auth/openidconnect',
        Passport.authenticate('openid-client', {
            session: true,
            failureRedirect: 'http://localhost:3000/' ,
            failureFlash: 'Invalid login, try again',
        }),	(req, res) => {
            console.log(res);
            console.log(req);
            res.json(req.body.user);
            res.json(req.body.id_token);
            res.json(req.body.access_token);
            res.json(req.user);
            res.redirect('/useraccount.html');
            console.log('SUCCESSFUL AUTHENTICATION');
            const token = req.body.access_token;
            const user = req.body.user;
            return (user, token);
	    }
    );

    routes.get('/useraccount.html',
        ensureLoggedIn('/user'),
        (req, res) => {
            res.send(req.user);
            res.send(req.body.access_token);
            console.log(req);
            console.log(req.body);
            console.log('USER: ', req.user);
            res.render('http://localhost:3000/useraccount.html');
        },
    );

    app.get('/logout', (req, res) => {
        console.log('LOGGING OUT SESSION: ', req.session);
        req.logout;
        req.session.destroy(() => res.redirect('http://localhost:3000/'));
    });

};
