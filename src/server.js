import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";

const PORT = 5000;
//creating express
const app = express();
const logger = morgan("dev");
app.use(logger);

//use() allow us to use function on every route
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

//opens the application to the internet
const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT}🚀`);

app.listen(PORT, handleListening);
//opens the application to the internet
