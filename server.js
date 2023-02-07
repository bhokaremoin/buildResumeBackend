const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./database");
mongoDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
  );
  next();
});
app.use(express.json());
app.use("/api", require("./Routes/auth"));
app.use("/api", require("./Routes/getresume"));
app.get("/", (req, res) => {
  res.send("Backend server for buildResume App running Successfully !!");
});
app.listen(port, () => {
  console.log(`Server Running at Port ${port} ....`);
});
