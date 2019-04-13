const router = require('express').Router();
const passport = require('passport');
// OAuth Login
router.get('/login', (req, res) => {
    res.render('login');
});

//OAuth logout
router.get('/logout', (req, res) => {
    //Is handled with Passport
    req.logout();
    res.redirect('/');
});

//OAuth Google 

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email', 'openid']
}));

// google OAuth redirect route

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send("You've reached the callback URI");
});

module.exports = router;