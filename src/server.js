import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";

const PORT = 5000;
//creating express
const app = express();
const logger = morgan("dev");

//let us use pug as our view engine
app.set("view engine", "pug");
//redirect express to where the pug files are
app.set("views", process.cwd() + "/src/views");

//use() allow us to use function on every route
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

//opens the application to the internet
const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT}🚀`);

app.listen(PORT, handleListening);
//opens the application to the internet
