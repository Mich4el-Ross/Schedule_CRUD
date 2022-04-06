const Login = require('../models/AccountModel')

exports.openIndex = (req, res) => {

    if (req.session.user) return res.render('account-logged')

    return res.render('account')
}

exports.signup = async function (req, res) {
    
    try {
        const account = new Login(req.body)
        
        await account.signup()

        if ( account.errors.length > 0) {
            req.flash('errors', account.errors)
            req.session.save( function () {
                return res.redirect('back')
            })
            return
        }

        req.flash('success', 'Your account has been created')
        req.session.save( function () {
            return res.redirect('back')
        })
        

    } catch (error) {
        console.log(error)
        return res.render('404')
    }

}

exports.signin = async function (req, res) {
    
    try {
        const account = new Login(req.body)
        
        await account.signin()

        if ( account.errors.length > 0) {
            req.flash('errors', account.errors)
            req.session.save( function () {
                return res.redirect('back')
            })
            return
        }

        req.flash('success', 'Successfully Login')
        req.session.user = account.user
        req.session.save( function () {
            return res.redirect('back')
        })
        

    } catch (error) {
        console.log(error)
        return res.render('404')
    }

}

exports.logout = function (req, res) {
    req.session.destroy()
    res.redirect('/')
}