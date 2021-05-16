import express from "express";
import { join, login } from "../controllers/userController.js";
import { trending } from "../controllers/videoController.js";

const globalRouter = express.Router();

//creating urls
globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
