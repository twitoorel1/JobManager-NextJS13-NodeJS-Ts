import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import {
	deleteCandidate,
	findAllCandidates,
	createCandidate,
	findById,
	updateCandidateById,
	updateAssignedCandidate,
	findAllCandidatesAssignmentsByIdCompany,
	findCandidateAssignmentByIdAndIdCompany,
	updateStatusCandidateAssignmentByIdAndIdCompany,
	deleteCandidateAssignmentByIdAndIdCompany
} from '../controllers/candidate.controller';
import { authRole } from '../middlewares/authentication.middleware';
import { ERoles } from '../types/global';
import { checkUserByIdCompany } from '../middlewares/user.middleware';
const router = express.Router();

/* CRUD
READ - FindById (By ID Candidate - Employee +) - Done!
READ - FindAllCandidates (Employee +) - Done!
READ - FindAllCandidatesByIdCompany (By ID Company)
READ - FindCandidateAssignmentByIdAndIdCompany (By ID Candidate And ID Company)

POST - CreateCandidate (Employee +) - Done!

UPDATE - UpdateCandidateById (By Id Candidate - Employee +) - Done!
UPDATE(patch) - UpdateAssignedCandidate (By Id Candidate And Id Company - Employee +)
UPDATE(patch) - UpdateCandidateAssignmentByIdAndIdCompany (By Id Candidate And Id Company - Employee +)
 
DELETE - DeleteCandidate (Only Admin Role) - Done!
DELETE - DeleteCandidateAssignmentByIdAndIdCompany (By ID Candidate And ID Company)
*/

// Candidate Assignments
router.get('/find/allCandidateByIdCompany/:idCompany', (req, res, next) => checkUserByIdCompany(req.params.idCompany)(req, res, next), catchAsyncError(findAllCandidatesAssignmentsByIdCompany));
router.get('/findOne/:idCompany/:idCandidate', (req, res, next) => checkUserByIdCompany(req.params.idCompany)(req, res, next), catchAsyncError(findCandidateAssignmentByIdAndIdCompany));
router.patch('/updateStatus/:idCompany/:idCandidate', (req, res, next) => checkUserByIdCompany(req.params.idCompany)(req, res, next), catchAsyncError(updateStatusCandidateAssignmentByIdAndIdCompany));
router.delete('/delete/:idCompany/:idCandidate', (req, res, next) => checkUserByIdCompany(req.params.idCompany)(req, res, next), catchAsyncError(deleteCandidateAssignmentByIdAndIdCompany));

/* Routes For Employee */
router.get('/employee/find/:idCandidate', authRole(ERoles.employee), catchAsyncError(findById));
router.get('/employee/findAll', authRole(ERoles.employee), catchAsyncError(findAllCandidates));

router.post('/employee/create', authRole(ERoles.employee), catchAsyncError(createCandidate));

router.put('/employee/update/:idCandidate', authRole(ERoles.employee), catchAsyncError(updateCandidateById));
router.patch('/employee/updateAssigned/:idCompany/:idCandidate', authRole(ERoles.employee), catchAsyncError(updateAssignedCandidate));

/* Routes For Admin */
router.delete('/admin/delete/:idCandidate', authRole(ERoles.employee), catchAsyncError(deleteCandidate));

export default router;
