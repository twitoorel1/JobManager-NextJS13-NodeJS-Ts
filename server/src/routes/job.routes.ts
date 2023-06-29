import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import { findAllJobsByIdCompany, findById, findAllJobs, createJobByIDCompany, updateJobById, updateStatusJob, deleteById } from '../controllers/job.controller';
import { authRole } from '../middlewares/authentication.middleware';
import { ERoles } from '../types/global';
import { checkJobIdIfSameIdCompany, checkUserByIdCompany } from '../middlewares/user.middleware';
const router = express.Router();

/* CRUD
READ - FindById (By ID Job and ID Company) - Done!
READ - FindAllJobsByIdCompany (By ID Company) - Done!
READ - FindAllJobs (Employee +) - Done!

POST - CreateJobByIDCompany (By ID Company) - Done!

UPDATE - UpdateJobById (By ID Job and ID Company - Employee +) - Done!
UPDATE(patch) - UpdateStatusJob (By ID Job and ID Company - Employee +) - Done!

DELETE - DeleteById (By ID Job and ID Company - Only Admin) - Done!
*/

router.get('/find/:idJob/:idCompany', (req, res, next) => checkJobIdIfSameIdCompany(req.params.idJob, req.params.idCompany)(req, res, next), catchAsyncError(findById));
router.get('/findAllJobs/:idCompany', (req, res, next) => checkUserByIdCompany(req.params.idCompany)(req, res, next), catchAsyncError(findAllJobsByIdCompany));
router.post('/create/:idCompany', (req, res, next) => checkUserByIdCompany(req.params.idCompany)(req, res, next), catchAsyncError(createJobByIDCompany));

/* Routes For Employee */
router.put('/employee/update/:idJob/:idCompany', authRole(ERoles.employee), catchAsyncError(updateJobById));
router.patch('/employee/updateStatus/:idJob/:idCompany', authRole(ERoles.employee), catchAsyncError(updateStatusJob));
router.get('/employee/findAllJobs', authRole(ERoles.employee), catchAsyncError(findAllJobs));

/* Routes For Admin */
router.delete('/admin/delete/:idCompany/:idJob', authRole(ERoles.employee), (req, res, next) => checkJobIdIfSameIdCompany(req.params.idJob, req.params.idCompany)(req, res, next), catchAsyncError(deleteById));

export default router;
