import express from "express";
import bodyParser from "body-parser";
import passport from "passport";

import { errorHandler } from "@middlewares/error";

import api from "../api";

export default app => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    );
    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(passport.initialize());

  app.use(api);

  app.use(errorHandler);
};
