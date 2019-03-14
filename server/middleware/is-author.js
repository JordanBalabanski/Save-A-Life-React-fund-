const User = require('../models/User');

module.exports = (req, res, next) => {
    User.findById(req.userId).then(() => {
        if (!user) {
            return res.status(401)
            .json({ message: 'Not authenticated.' });
        }
    
        if (!user.myPosts.includes(req.params.id)) {
            return res.status(401)
            .json({ message: 'Not authorized.' });
        }
    
        next();
    });
}