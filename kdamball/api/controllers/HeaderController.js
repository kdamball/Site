module.exports = {

    replacePoweredBy: function(req, res, next){
        res.setHeader("X-Powered-By", "Node.js");
        next();
    
    }
}