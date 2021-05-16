import express from "express";
import { watch, getEdit, postEdit } from "../controllers/videoController.js";

const videoRouter = express.Router();

//upload has to be above /:id, if not express will think its an id
videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

export default videoRouter;
