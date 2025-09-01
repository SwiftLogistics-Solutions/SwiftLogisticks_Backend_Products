// MongoDB connection setup
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://middleware58_db_user:12345@cluster-1.6ci6iel.mongodb.net/Middleware'; // Replace with your actual connection string

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1);
	}
};

module.exports = connectDB;
