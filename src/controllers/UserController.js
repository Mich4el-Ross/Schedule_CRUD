const Users = require('../models/UserModel')

exports.openIndex = (req, res) => {
    res.render('add-user', { users: {} })
}

exports.register = async (req, res) => {

    try {

        const users = new Users(req.body)
        await users.register()

        if ( users.errors.length > 0) {
            req.flash('errors', users.errors)
            req.session.save( () => res.redirect('back') )
            return
        }

        req.flash('success', 'New User added successfully')
        req.session.save( () => res.redirect(`/add-user/index/${users.users._id}`) )
        return

    } catch (error) {
        console.log(error)
        return res.render('404')
    }

}

exports.openEditIndex = async (req, res) => {

    if ( !req.params.id) return res.render('404')

    const users = await Users.findUserById(req.params.id)

    if (!users) return res.render('404')  

    res.render('add-user', { users })

}

exports.edit = async (req, res) => {

    try {
        
        if ( !req.params.id) return res.render('404')

        const users = new Users(req.body)
    
        await users.edit(req.params.id)
    
        if ( users.errors.length > 0) {
            req.flash('errors', users.errors)
            req.session.save( () => res.redirect('back') )
            return
        }
    
        req.flash('success', 'User edited successfully')
        req.session.save( () => res.redirect(`/add-user/index/${req.params.id}`) )
        return

    } catch (error) {
        console.log(error)
        return res.render('404')
    }
}

exports.delete = async (req, res) => {

    if ( !req.params.id) return res.render('404')

    const users = await Users.deleteUser(req.params.id)

    if (!users) return res.render('404')  

    req.flash('success', 'User deleted successfully')
    req.session.save( () => res.redirect(`back`) )
    return

}