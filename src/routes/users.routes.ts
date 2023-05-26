import { Router } from "express";
import {
  createUsersController,
  deleteUsersController,
  readAllUsersController,
  readOneUserController,
  recoverUsersController,
  updateUsersController,
} from "../controllers/users.controllers";
import ensureEmailNotExistsMiddleware from "../middlewares/ensureEmailNotExists.midleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { postUserSchema, updateUserSchema } from "../schemas/users.schemas";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureAdminToken from "../middlewares/ensureAdminToken.middleware";
import ensureAdminAccess from "../middlewares/ensureAdminAccess.middleware";
import ensureUserisActiveMiddleware from "../middlewares/ensureUserIsActive.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureBodyIsValidMiddleware(postUserSchema),
  ensureEmailNotExistsMiddleware,
  createUsersController
);

userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureAdminToken,
  readAllUsersController
);

userRoutes.get("/profile", ensureTokenIsValidMiddleware, readOneUserController);

userRoutes.patch(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureAdminAccess,
  ensureBodyIsValidMiddleware(updateUserSchema),
  ensureEmailNotExistsMiddleware,
  updateUsersController
);

userRoutes.delete(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureAdminAccess,
  deleteUsersController
);

userRoutes.put(
  "/:id/recover",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureAdminToken,
  ensureUserisActiveMiddleware,
  recoverUsersController
);

export { userRoutes };
