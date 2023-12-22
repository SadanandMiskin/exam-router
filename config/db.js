const mongoose = require('mongoose') 

async function dbConnect() {
    try { 
        await  mongoose.connect(process.env.mongo)
          console.log('MongoDB connected')
      }
      catch(err) {
          console.error(err)
      }
}

module.exports = dbConnect() 