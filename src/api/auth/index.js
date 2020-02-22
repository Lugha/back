import express from "express";
import passport from "passport";
import { CREATED } from "http-status";

import local from "./local/login/controller";
import { localSchema } from "./local/login/schema";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

import "../../strategies/local";

const router = express.Router();

router.post(
  "/local/login",
  localSchema,
  passport.authenticate("local-login"),
  local
);

router.post(
  "/local/register",
  localSchema,
  passport.authenticate("local-register"),
  (req, res) => {
    res.sendStatus(CREATED);
  }
);

export default router;
