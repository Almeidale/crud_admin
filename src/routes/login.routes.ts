import { Router } from "express";
import { createSessionController } from "../controllers/session.controllers";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { requestLoginSchema } from "../schemas/login.schemas";
import ensureUserisActiveMiddleware from "../middlewares/ensureUserIsActive.middleware";

const loginRoutes = Router();

loginRoutes.post(
  "",
  ensureUserisActiveMiddleware,
  ensureBodyIsValidMiddleware(requestLoginSchema),
  createSessionController
);

export default loginRoutes;
