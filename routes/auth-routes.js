const router = require("express").Router();
const passport = require("passport");
// OAuth Login
router.get("/login", (req, res) => {
    res.redirect("/google");
});

//OAuth logout
router.get("/logout", (req, res) => {
    //Is handled with Passport
    req.logout();
    res.redirect('/');
});

//OAuth Google 

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email", "openid"]
}));

// google OAuth redirect route

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.cookie('uId', req.user.userId);
    res.redirect("/profile/");
    
});

module.exports = router;