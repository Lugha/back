import express from 'express';

import health from './health';

const router = express.Router();

router.use('/api/health', health);

export default router;