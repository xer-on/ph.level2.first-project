import express from 'express';

const router = express.Router();

router.post('/create-user', UserControllers.createUser);

export const UserRoutes = router;
