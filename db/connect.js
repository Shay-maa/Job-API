const mongoose = require ('mongoose')
mongoose.set('strictQuery', true);

const connectDB = (uri)=>{
        mongoose.connect(uri)
}
module.exports = connectDB