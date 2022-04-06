const Mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require('bcryptjs')


const AccountSchema = new Mongoose.Schema({
    
    email: { type: String , required: true},
    password: { type: String , required: true}

})

const AccountModel = Mongoose.model('Account', AccountSchema)

class Account {

    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null
    }

    
    async signin() {

        this.validateFields()

        if (this.errors.length > 0) return

        this.user = await AccountModel.findOne( { email: this.body.email } )

        if (!this.user) {
            this.errors.push('User does not exists')
            return
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Invalid password')
            this.user = null
            return
        }

    }


    async signup() {
        this.validateFields()

        if (this.errors.length > 0) return

        await this.userExists()

        if (this.errors.length > 0) return

        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)

        this.user = await AccountModel.create(this.body)

    }

    validateFields() {

        this.cleanUp()

        if (!validator.isEmail(this.body.email)) {
            this.errors.push('Invalid E-mail')
        }

        if (this.body.password.length < 5 || this.body.password.length > 15) {
            this.errors.push('Password must contain 5 - 15 char.')
        }
    }


    cleanUp() {
        
        for (const key in this.body) {

            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            } 

        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

    async userExists() {

        this.user = await AccountModel.findOne( { email: this.body.email } )
        if (this.user) this.errors.push('Username already exists! Choose another')

    }
}

module.exports = Account