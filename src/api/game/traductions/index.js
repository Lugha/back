import express from 'express';

import get from './get/controller';

const router = express.Router();

router.get('/', get);

export default router;