import mongoose from 'mongoose';
require('dotenv').config()

const db = {
  url: process.env.DB_URI || '',
  options: {
  },
};

const connectDb = async () => {
    try {
        await mongoose.connect(db.url, db.options);
        mongoose.set('debug', true);

    } catch (error) {
        console.error('Error connecting to the database');
    }
}

export default connectDb;