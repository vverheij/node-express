function authenticate(req, res, next) {
    console.log('authentcited...');
    next();
}
module.exports = authenticate;

