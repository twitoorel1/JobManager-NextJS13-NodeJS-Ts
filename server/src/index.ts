import express, { Express } from 'express';
import cors from 'cors';
import 'dotenv/config';
import appRoutes from './routes/index.js';
import initialMongoConnection from './initialConnection.js';
import errorHandler from './errors/errorHandler.js';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

const app: Express = express();

// Time Zone
momentTimezone.tz.setDefault('Asia/Jerusalem');
moment.tz.setDefault('Asia/Jerusalem');

app.use(cors({ origin: '*' }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(appRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
initialMongoConnection()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`[server]: Server is running at http://localhost:${PORT}`);
		});
	})
	.catch((error: any) => console.log(error.message));
