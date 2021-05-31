import "dotenv/config";
import "./db.js"; //importing a file
import "./models/Video.js";
import "./models/User.js";
import "./models/Comment.js";
import app from "./server.js";

const PORT = 5000;

//opens the application to the internet
const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT}🚀`);

app.listen(PORT, handleListening);
//opens the application to the internet
