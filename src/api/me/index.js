import express from 'express';

import { authorization } from '../../middlewares/authorization';

import get from './get/controller';

const router = express.Router();

router.get('/', authorization(), get);

export default router;