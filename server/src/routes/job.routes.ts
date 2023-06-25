import express from 'express';
import catchAsyncError from '../errors/catchAsyncError.js';
import { createJob, deleteById, findById, getAllJobsByIdCompany, getAllJobs, updateById } from '../controllers/job.controller.js';
import { authRole } from '../middlewares/authentication.middleware.js';
import { ERoles } from '../types/global.js';
const router = express.Router();

/* CRUD
Create (By ID Company) - Done!
Read (By ID And ID Company) - Done!
Read ALL (By Id Company) - Done!

Update(admin, employee - By ID And ID Company) - Done!
Delete(admin - By ID And ID Company) - Done!
*/

router.get('/find/:id/:idCompany', catchAsyncError(findById));
router.post('/create/:idCompany', catchAsyncError(createJob));
router.get('/all/:id/:idCompany', catchAsyncError(getAllJobsByIdCompany));

/* Routes For Employee */
router.get('/employee/all', authRole(ERoles.employee), catchAsyncError(getAllJobs));
router.put('/employee/update/:id/:idCompany', authRole(ERoles.employee), catchAsyncError(updateById));

/* Routes For Admin */
router.delete('/admin/delete/:id/:idCompany', authRole(ERoles.admin), catchAsyncError(deleteById));

export default router;
