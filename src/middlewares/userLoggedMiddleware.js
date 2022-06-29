
const db = require('../database/models');

function userLoggedMiddleware (req,res,next){
    res.locals.isLogged = false;
    if(req.session.logedUser){
        res.locals.isLogged = true;
        res.locals.logedUser = req.session.logedUser;
    }
    if(res.cookie.userEmail != undefined){
            db.User
            .findOne({where:{Email: req.cookie.userEmail}})
            .then(userFromCookie => { 
                 console.log(userFromCookie);
                 req.session.logedUser = userFromCookie;
                 if(req.session.logedUser){
                    res.locals.isLogged = true;
                    res.locals.logedUser = req.session.logedUser;
                }
            })
    }
    next();
}
module.exports = userLoggedMiddleware;