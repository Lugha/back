import express from "express";

import health from "./health";
import auth from "./auth";
import me from './me';
import user from './user';
import game from './game';

const router = express.Router();

router.use("/api/health", health);
router.use("/api/auth", auth);
router.use("/api/me", me);
router.use("/api/user", user);
router.use("/api/game", game);

export default router;
