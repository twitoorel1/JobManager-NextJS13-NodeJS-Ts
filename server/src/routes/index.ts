import express from 'express';
import formatUptime from '../utils/dates.util';
import { authJwtTokenVerify, authRole } from '../middlewares/authentication.middleware';
import { ERoles } from '../types/global';

// Routes
import authRoute from './authentication.routes';
import userRoute from './user.routes';
import companyRoute from './company.routes';
import jobRoute from './job.routes';
import candidateRoute from './candidate.routes';

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).json({ message: `Server Running ${formatUptime(process.uptime())}` });
});
router.use('/auth', authRoute);
router.use('/user', authJwtTokenVerify, userRoute);
router.use('/company', authJwtTokenVerify, authRole(ERoles.employee), companyRoute);
router.use('/job', authJwtTokenVerify, jobRoute);
router.use('/candidate', authJwtTokenVerify, candidateRoute);

export default router;
