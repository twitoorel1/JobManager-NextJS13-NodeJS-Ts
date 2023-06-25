import express from 'express';
import formatUptime from '../utils/dates.util.js';
import { authJwtTokenVerify } from '../middlewares/authentication.middleware.js';

// Routes
import authRoute from './authentication.routes.js';
import userRoute from './user.routes.js';
import companyRoute from './company.routes.js';
import jobRoute from './job.routes.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).json({ message: `Server Running ${formatUptime(process.uptime())}` });
});
router.use('/auth', authRoute);
router.use('/user', authJwtTokenVerify, userRoute);
router.use('/company', authJwtTokenVerify, companyRoute);
router.use('/job', authJwtTokenVerify, jobRoute);

export default router;
