var db = require("../models");

module.exports = function(app) {

    // FIND ALL observations
    app.get("/api/observations", function(req, res) {
        db.Observations.findAll({})
            .then(function(dbObs) {
                res.json(dbObs);
            });
    });





    // FIND ALL observations grouped by category
    // CHECK THIS IN POSTMAN
    app.get("/api/observations/:category", function(req, res) {
        db.Observations.findAll({
            where: {
                category: ["category"]
            },
            group: ["category"],
            include: [db.Observations]
        }).then(function(dbObs) {
                res.json(dbObs);
            });
    });








    // FIND ALL observations by category
    app.get("/api/categories/animal", function(req, res) {
        db.Observations.findAll({
            where: {
                category: "animal"
            }
        }).then(function(obsAnimal){
            res.json(obsAnimal);
        });
    });
    app.get("/api/categories/plant", function(req, res) {
        db.Observations.findAll({
            where: {
                category: "plant"
            }
        }).then(function(obsPlant){
            res.json(obsPlant);
        });
    });
    app.get("/api/categories/fungus", function(req, res) {
        db.Observations.findAll({
            where: {
                category: "fungus"
            }
        }).then(function(obsFungus){
            res.json(obsFungus);
        });
    });
    app.get("/api/categories/weather", function(req, res) {
        db.Observations.findAll({
            where: {
                category: "weather"
            }
        }).then(function(obsWeather){
            res.json(obsWeather);
        });
    });
    app.get("/api/categories/land_water", function(req, res) {
        db.Observations.findAll({
            where: {
                category: "land_water"
            }
        }).then(function(obsLandWater){
            res.json(obsLandWater);
        });
    });
    app.get("/api/categories/other", function(req, res) {
        db.Observations.findAll({
            where: {
                category: "other"
            }
        }).then(function(obsOther){
            res.json(obsOther);
        });
    });

    // GET most recent observation of each category
    app.get("/api/mostrecentanimal", function(req, res) {
        db.Observations.findAll({
            limit: 1,
            where: {
                category: "animal",

            },
            order: [["id", "DESC"]]
        }).then(function(recentAnimal) {
            res.json(recentAnimal);
        });
    });
    app.get("/api/mostrecentplant", function(req, res) {
        db.Observations.findAll({
            limit: 1,
            where: {
                category: "plant",

            },
            order: [["id", "DESC"]]
        }).then(function(recentPlant) {
            res.json(recentPlant);
        });
    });
    app.get("/api/mostrecentFungus", function(req, res) {
        db.Observations.findAll({
            limit: 1,
            where: {
                category: "fungus",

            },
            order: [["id", "DESC"]]
        }).then(function(recentFungus) {
            res.json(recentFungus);
        });
    });
    app.get("/api/mostrecentweather", function(req, res) {
        db.Observations.findAll({
            limit: 1,
            where: {
                category: "weather",

            },
            order: [["id", "DESC"]]
        }).then(function(recentWeather) {
            res.json(recentWeather);
        });
    });
    app.get("/api/mostrecentlandwater", function(req, res) {
        db.Observations.findAll({
            limit: 1,
            where: {
                category: "land_water",

            },
            order: [["id", "DESC"]]
        }).then(function(recentLandWater) {
            res.json(recentLandWater);
        });
    });
    app.get("/api/mostrecentother", function(req, res) {
        db.Observations.findAll({
            limit: 1,
            where: {
                category: "other",

            },
            order: [["id", "DESC"]]
        }).then(function(recentOther) {
            res.json(recentOther);
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

    // FIND ALL users
    // do I need this?
    app.get("/api/users", function(req, res) {
        db.User.findAll({})
            .then(function(allusr) {
                res.json(allusr);
            });
    });

    // CREATE new user
    // do I need this?
    app.post("/api/users", function(req, res) {
        db.User.create(req.body)
            .then(function(newusr) {
                res.json(newusr);
            });
    });

    // GET one user's observations
    app.get("/api/users/:id", function(req, res) {
        db.Users.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Observations] 
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

};
