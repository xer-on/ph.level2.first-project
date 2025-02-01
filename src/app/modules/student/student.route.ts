import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();
//will call controller function
router.get('/:studentId', StudentControllers.getSingleStudent);
router.get('/', StudentControllers.getAllStudents);
router.post('/create-student', StudentControllers.createStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
