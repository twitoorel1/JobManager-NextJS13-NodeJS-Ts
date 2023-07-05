import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import { createCompany, deleteCompanyById, findById, findAllCompanies, updateCompanyById } from '../controllers/company.controller';
import { authRole } from '../middlewares/authentication.middleware';
import { ERoles } from '../types/global';
const router = express.Router();

/* CRUD - All Request For Employee And Admin Role -
Read - FindById (By companyId) - Done!
Read - FindAllCompanies - Done!

UPDATE - UpdateCompanyById (By companyId)

DELETE - DeleteCompanyById (By companyId - Only Admin Role)
Post - CreateCompany (Only Admin Role)
*/

/* Routes For employee And Admin */
router.get('/employee/find/:companyId', authRole(ERoles.employee), catchAsyncError(findById));
router.get('/employee/allCompanies', authRole(ERoles.employee), catchAsyncError(findAllCompanies));

router.patch('/employee/update/:companyId', authRole(ERoles.employee), catchAsyncError(updateCompanyById));

/* Routes For Only Admin */
router.post('/admin/create', authRole(ERoles.employee), catchAsyncError(createCompany));
router.delete('/admin/delete/:companyId', authRole(ERoles.admin), catchAsyncError(deleteCompanyById));

export default router;
