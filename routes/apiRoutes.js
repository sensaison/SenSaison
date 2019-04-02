var db = require("../models");

module.exports = function(app) {
    app.get("/api/observations", function(req, res) {
        db.Observation.findAll({}).then(function(allobs) {
            res.json(allobs);
        });
    });

    app.get("/api/users", function(req, res) {
        db.User.findAll({}).then(function(allusr) {
            res.json(allusr);
        });
    });

    app.post("/api/observations", function(req, res) {
        db.Observation.create(req.body).then(function(newobs) {
            res.json(newobs);
        });
    });

    app.post("/api/users", function(req, res) {
        db.User.create(req.body).then(function(newusr) {
            res.json(newusr);
        });
    });

    app.set("/api/observations/:id", function(req, res) {
        db.Observation.update({
            where: {
                id: req.params.id
            }
<<<<<<< HEAD
        }).then(
            function(updobs) {
                if (updobs.changedRows === 0) {
                    return res.status(404).end();
                }
                res.status(200).end();
            }
        );
    })
  
=======
        }).then(function(updobs) {
            res.json(updobs);
        });
    });

>>>>>>> 213cd5eba2a5c881d21827951dbcf62b6b1a8e44
    app.set("/api/users/:id", function(req, res) {
        db.User.update({
            where: {
                id: req.params.id
            }
<<<<<<< HEAD
        }).then(
            function(updusr) {
                if (updusr.changedRows === 0) {
                    return res.status(404).end();
                }
                res.status(200).end();
            }
        );
=======
        }).then(function(updusr) {
            res.json(updusr);
        });
>>>>>>> 213cd5eba2a5c881d21827951dbcf62b6b1a8e44
    });
};
