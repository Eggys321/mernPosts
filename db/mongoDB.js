const mongoose = require('mongoose');

require('dotenv/config');

const mongoDBUrl = process.env.DBURL

const connect = async()=>{
    try {
        await mongoose.connect(mongoDBUrl)
        console.log('mongoDB connected successfully');
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connect