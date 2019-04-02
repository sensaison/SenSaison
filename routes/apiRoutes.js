var db = require("../models");

module.exports = function(app) {

    app.get("/api/observations", function(req, res) {
        db.Observation.findAll({}).then(
            function(allobs) {
              res.json(allobs);
            }
        );
    });

    app.get("/api/users", function(req, res) {
        db.User.findAll({}).then(
            function(allusr) {
              res.json(allusr);
            }
        );
    });

    app.post("/api/observations", function(req, res) {
        db.Observation.create(req.body).then(
            function(newobs) {
                res.json(newobs);
            }
        );
    });

    app.post("/api/users", function(req, res) {
        db.User.create(req.body).then(
            function(newusr) {
                res.json(newusr);
            }
        );
    });

    app.set("/api/observations/:id", function(req, res) {
        db.Observation.update({
            where: {
                id: req.params.id
            }
        }).then(
            function(updobs) {
                if (updobs.changedRows === 0) {
                    return res.status(404).end();
                }
                res.status(200).end();
            }
        );
    });

    app.set("/api/users/:id", function(req, res) {
        db.User.update({
            where: {
                id: req.params.id
            }
        }).then(
            function(updusr) {
                if (updusr.changedRows === 0) {
                    return res.status(404).end();
                }
                res.status(200).end();
            }
        );
    });

};
