const mongoose = require('mongoose')

const querySchema  = mongoose.Schema({
    route: String ,
    message: String ,
})

const queryModel = mongoose.model('query' , querySchema)

module.exports = queryModel