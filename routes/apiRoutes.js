var db = require("../models");

module.exports = function(app) {

    // FIND ALL observations
    app.get("/api/observations", function(req, res) {
        db.Observations.findAll({
            include: [{
                all: true,
                nested: true
            }] 
        }).then(function(dbObs) {
                res.json(dbObs);
            });
    });


    // FIND ALL observations grouped by category
    app.get("/api/categories/:category", function(req, res) {
        db.Observations.findAll({
            where: {
                category: req.params.category
            },
            include: [{
                all: true,
                nested: true
            }] 
        }).then(function(dbObs) {
                res.json(dbObs);
            });
    });

    // GET most recent ONE observation of each category  by TIMESTAMP
    app.get("/api/:category/mostrecentone", function(req, res) {
        db.Observations.findAll({
            limit: 1,
            where: {
                category: req.params.category,

            },
            order: [["createdAt", "DESC"]]
        }).then(function(recentObs) {
            res.json(recentObs);
        });
    });

    // GET most recent FIVE observations of each category by TIMESTAMP
    app.get("/api/:category/mostrecentfive", function(req, res) {
        db.Observations.findAll({
            limit: 5,
            where: {
                category: req.params.category,

            },
            order: [["createdAt", "DESC"]]
        }).then(function(recentObs) {
            res.json(recentObs);
        });
    });

    // CREATE new observation
    app.post("/api/observations", function(req, res) {
        db.Observations.create(req.body)
            .then(function(dbObs) {
                res.json(dbObs);
            });
    });

    // DESTROY one observation
    app.delete("/api/observations/:id", function(req, res) {
        db.Observations.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbObs) {
            res.json(dbObs);
        });
    });

    // FIND ALL observations for request data download
    app.get("/request", function(req, res) {
        db.Observations.findAll({
            where: {
                category: req.params.category,
                date_obs: {
                    [Op.gte]: req.params.minDate,
                    [Op.lte]: req.params.maxDate
                }
            }
        }).then(function(err, res) {
            if (err) throw err;

        })
    });

    // FIND ALL users
    app.get("/api/users", function(req, res) {
        db.Users.findAll({
            include: [{
                all: true,
                nested: true
            }] 
        }).then(function(allusr) {
                res.json(allusr);
            });
    });

    // CREATE new user
    app.post("/api/users", function(req, res) {
        db.Users.create(req.body)
            .then(function(newusr) {
                res.json(newusr);
            });
    });

};
