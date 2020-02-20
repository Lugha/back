import express from 'express';

import { NO_CONTENT } from 'http-status';

const router = express.Router();

router.get('/', (req, res) => res.status(NO_CONTENT).end());

export default router;