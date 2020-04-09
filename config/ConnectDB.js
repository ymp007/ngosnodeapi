const mongoose = require('mongoose');
const config = require('config');

const dbconn = config.get('mongoDBConnectURI');

const connectDB  = async () =>{
try {
    await mongoose.connect(dbconn,{ useUnifiedTopology: true , useNewUrlParser: true});
    console.log('database connected');
} catch (error) {
    console.log('unable to connect DB');
    console.log(error);
    process.exit();
}
}

module.exports = connectDB;