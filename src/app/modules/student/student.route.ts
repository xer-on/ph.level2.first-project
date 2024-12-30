import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();
//will call controller function
router.get('/:studentId', StudentControllers.getSinglStudent);
router.get('/', StudentControllers.getAllStudents);
router.post('/create-student', StudentControllers.createStudent);

export const StudentRoutes = router;
