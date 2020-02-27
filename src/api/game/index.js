import express from 'express';

import traductions from './traductions';

const router = express.Router();

router.use('/traductions', traductions);

export default router;