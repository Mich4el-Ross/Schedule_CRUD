const Mongoose = require("mongoose");
const validator = require("validator");

const UsersSchema = new Mongoose.Schema({
    
    name: { type: String , required: true },
    middlename: {type: String , required: false, default: ''},
    email: {type: String , required: false, default: ''},
    phonenumber: {type: String , required: false, default: ''},
    gender: { type: String , required: true },
    createdOn: { type: Date , default: Date.now }

})

const UsersModel = Mongoose.model('Users', UsersSchema)

class Users {

    constructor(body) {
        this.body = body
        this.errors = []
        this.users = null
    }

    static async findUserById (id) {

        if (typeof id !== 'string') return

        const users = await UsersModel.findById(id)
        return users
    }

    static async findUsers () {

        const users = await UsersModel.find().sort( { createdOn: -1 } )
        return users
    }

    static async deleteUser (id) {

        if (typeof id !== 'string') return

        const users = await UsersModel.findOneAndDelete( { _id: id } )
        return users
    }


    async edit(id) {
        
        if (typeof id !== 'string') return

        this.validateFields(this.body)

        if (this.errors.length > 0) return

        this.users = await UsersModel.findByIdAndUpdate(id, this.body, { new: true })
    }


    async register() {
        this.validateFields(this.body)

        if (this.errors.length > 0) return

        this.users = await UsersModel.create(this.body)
    }


    validateFields(body) {

        this.cleanUp(body)
        
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid E-mail') 
        
        if (!this.body.name) this.errors.push('Name is required') 
        if (!this.body.gender) this.errors.push('Gender is required') 
        
        if (!this.body.email && !this.body.phonenumber) {
            this.errors.push('Email / PhoneNumber required') 
        }

    }


    cleanUp(body) {
        
        for (const key in body) {

            if (typeof body[key] !== 'string') {
                body[key] = ''
            } 

        }

        body = {
            name: this.name,  
            middlename: this.middlename,    
            email: this.email,        
            phonenumber: this.phonenumber, 
            gender: this.gender
        }
    }

}

module.exports = Users