import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import { localsMiddleware } from "./middlewares.js";
import MongoStore from "connect-mongo";
import apiRouter from "./routers/apiRouter.js";

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
//form으로 부터 오는 정보를 req.body.(name)에 저장해준다
app.use(express.urlencoded({ extended: true }));
//convert data to json
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    //saving session to mongoDB
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
