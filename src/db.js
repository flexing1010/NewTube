import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/newtube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError);
// to let me know if we are connected to db
db.once("open", handleOpen);
