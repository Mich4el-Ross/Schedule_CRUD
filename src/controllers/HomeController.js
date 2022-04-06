const Users = require('../models/UserModel')


exports.openIndex = async (req, res) => {

    const users = await Users.findUsers()

    res.render('index', { users })
}