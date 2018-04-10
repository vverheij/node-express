function authenticate(req, res, next) {
    console.log('authentcited...');
    next();
}
module.exports = authenticate;

// function authenticate(req, res, next) {
//     console.log('Authenticating...');
//     next();
// }

// module.exports = authenticate;