import express from 'express';
import catchAsyncError from '../errors/catchAsyncError.js';
import { createCompany, deleteById, findById, getAllCompany, updateById } from '../controllers/company.controller.js';
import { authRole } from '../middlewares/authentication.middleware.js';
import { ERoles } from '../types/global.js';
const router = express.Router();

/* CRUD
Create (admin, employee) - Done!
Read, Read ALL (admin, employee) - Done!
Update(admin, employee) - Done!
Delete(admin) - Done!
*/

/* Routes For Employee */
router.get('/employee/find/:id', authRole(ERoles.employee), catchAsyncError(findById));
router.post('/employee/create', authRole(ERoles.employee), catchAsyncError(createCompany));
router.get('/employee/all', authRole(ERoles.employee), catchAsyncError(getAllCompany));
router.put('/employee/update/:id', authRole(ERoles.employee), catchAsyncError(updateById));

/* Routes For Admin */
router.delete('/admin/delete/:id', authRole(ERoles.admin), catchAsyncError(deleteById));

export default router;
