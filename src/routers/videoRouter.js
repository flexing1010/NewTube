import express from "express";
import {
  see,
  edit,
  upload,
  deleteVideo,
} from "../controllers/videoController.js";

const videoRouter = express.Router();

//upload has to be above /:id, if not express will think its an id
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/:id(\\d+)/edit", edit);

export default videoRouter;
