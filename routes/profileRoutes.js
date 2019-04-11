const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        // executes when user is not logged in.
        res.redirect('/auth/login');
    } else {
        // executes when logged in
        next();
    }
}

router.get('/', authCheck, (req, res)=>{
    res.send("Welcome " + req.user.firstName);
});


module.exports = router;