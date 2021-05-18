import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";

//creating express
const app = express();
const logger = morgan("dev");

//let us use pug as our view engine
app.set("view engine", "pug");
//redirect express to where the pug files are
app.set("views", process.cwd() + "/src/views");

//use() allow us to use function on every route
app.use(logger);
//bodyparser의 역할
app.use(express.urlencoded({ extended: true }));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
