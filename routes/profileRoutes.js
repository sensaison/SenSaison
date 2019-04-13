const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(req.user){
        // executes when user is not logged in.
        res.redirect('/');
    } else {
        // executes when logged in
        next();
    }
}

router.get('/', authCheck, (req, res)=>{
    res.redirect('/useraccount.html');
    
});

router.get('/useraccount.html', authCheck, (req, res)=>{
    console.log(req.user)
    res.send();
});


module.exports = router; 