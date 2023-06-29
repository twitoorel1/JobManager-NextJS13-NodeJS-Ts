import mongoose from 'mongoose';

const MONGO_CONNECTION_URI = process.env.NODE_ENV === 'development' ? process.env.MONGO_ATLAS_URI_DEVELOPMENT : process.env.MONGO_ATLAS_URI;

const initialMongoConnection = async () => {
	try {
		// mongoose.set("strictQuery", false);
		await mongoose.connect(String(MONGO_CONNECTION_URI));
		console.log('Connected to MongoDB');
	} catch (error: any) {
		console.log('Could not connect to MongoDB');
		console.log(error);
	}
};

export default initialMongoConnection;
