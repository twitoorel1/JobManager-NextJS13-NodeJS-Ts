import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import { FindAllUsersFromCompany, createNewUser, deleteUserByUserId, editImageProfileById, editPasswordById, findAllUsers, findById, sendEmailByUserId, updateUserById } from '../controllers/user.controller';
import { authRole } from '../middlewares/authentication.middleware';
import { ERoles } from '../types/global';
import { upload } from '../middlewares/uploadImage.middleware';
import { checkUserIfWorkingInCompany, checkUserIdByParam, checkUserByIdCompany } from '../middlewares/user.middleware';
const router = express.Router();

/* CRUD
Read - FindById (By UserID And ID Company) - Done!
Read - FindAllUsersFromCompany (By UserID And ID Company) - Done!
Read - FindAllUsers (employee and admin) - Done!

POST - SendEmailByUserId (All Users) - Done!

UPDATE - UpdateUserById (Only User with ID Or Admin) - Done!
UPDATE - EditPasswordById (Only User with ID Or Admin) - Done!
UPDATE - EditImageProfileById (Only User with ID Or Admin) - Done!

DELETE - DeleteUserByUserId (Only Admin) - Done!
 
CREATE - CreateNewUser (Only Admin) - Done!
*/

// Routes For All User
router.get('/find/:idCompany/:userId', (req, res, next) => checkUserIfWorkingInCompany(req.params.idCompany, req.params.userId)(req, res, next), catchAsyncError(findById));
router.get('/findUsersCompany/:idCompany', (req, res, next) => checkUserByIdCompany(req.params.idCompany)(req, res, next), catchAsyncError(FindAllUsersFromCompany));
router.put('/update/:userId', (req, res, next) => checkUserIdByParam(req.params.userId)(req, res, next), catchAsyncError(updateUserById));
router.put('/editPassword/:userId', (req, res, next) => checkUserIdByParam(req.params.userId)(req, res, next), catchAsyncError(editPasswordById));
router.put('/editImageProfile/:userId', (req, res, next) => checkUserIdByParam(req.params.userId)(req, res, next), upload.single('imgSrc'), catchAsyncError(editImageProfileById));
router.post('/sendEmail/:userId', (req, res, next) => checkUserIdByParam(req.params.userId)(req, res, next), catchAsyncError(sendEmailByUserId));

/* Routes For employee And Admin */
router.get('/employee/findAll', authRole(ERoles.employee), catchAsyncError(findAllUsers));

/* Routes For Only Admin */
router.post('/admin/new', authRole(ERoles.employee), upload.single('imgSrc'), catchAsyncError(createNewUser));
router.delete('/admin/delete/:userId', authRole(ERoles.employee), catchAsyncError(deleteUserByUserId));

export default router;
