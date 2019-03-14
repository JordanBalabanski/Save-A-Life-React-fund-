const User = require('../models/User');

module.exports = async(req, res, next) => {
    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(401)
        .json({ message: 'Not authenticated.' });
    }

    if (!user.myPosts.includes(req.params.id) && !user.isInRole('admin')) {
        return res.status(401)
        .json({ message: 'Not authenticated.' });
    }

    next();
}