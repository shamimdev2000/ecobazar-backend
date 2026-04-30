const jwt = require("jsonwebtoken")

let secureMiddleware = (req,res,next)=>{

    // let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
  if(err){
    res.send({message:"unauthorized"})
  }else{
    next()
  }
    

});
module.exports = secureMiddleware