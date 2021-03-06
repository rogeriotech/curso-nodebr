const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const Jwt = require('jsonwebtoken')

const failAction = (req, res, err) => {
    return err
}

const USER = {
    username: 'John Jones',
    password: '123'
}

class AuthRoutes extends BaseRoute {
    constructor(secret) {
        super()
        this.secret = secret
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false, 
                tags: ['api'],
                description: 'Obter token',
                notes: 'Faz login com user e senha do banco',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request, header) => {
                const { username, password } = request.payload
                // console.log('username', username) 
                // console.log('password', password) 

                if (username.toLowerCase() !== USER.username.toLowerCase() || password !== USER.password)
                    return Boom.unauthorized()

                const token = Jwt.sign({
                    username: username,
                    id: 1
                }, this.secret)
                return {
                    token
                }
            }

        }
    }
}

module.exports = AuthRoutes