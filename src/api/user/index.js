import express from 'express';

import { authorization } from '../../middlewares/authorization';

import put from './put/controller';

const router = express.Router();

router.put('/', authorization(), put);

export default router;