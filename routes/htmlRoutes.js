var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        res.render("index", {});
    });

    app.get("/home", function(req, res) {
        res.render("home", {});
    });

    app.get("/map", function(req, res) {
        res.render("map", {});
    });

    app.get("/contact", function(req, res) {
        res.render("map", {});
    });

    app.get("/updates", function(req, res) {
        res.render("updates", {});
    });

    app.get("/useraccount", function(req, res) {
        res.render("submit", {});
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};