module.exports = function (req, res, next){
    res.setHeader('X-Powered-By', 'Some Myth');
    next();
}