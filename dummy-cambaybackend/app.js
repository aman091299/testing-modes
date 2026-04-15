require("dotenv").config();
const cors = require("cors");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const connectDB = require("./config/database");
const express = require("express");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://dummy-dashboard-for-registeration-p.vercel.app",
    ],
  }),
);

app.use(express.json());

app.use("/", productRouter);
app.use("/", categoryRouter);

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("DB connected Sucessfully");
    app.listen(port, () => {
      console.log("server is  running on port " + port);
    });
  })
  .catch((err) => {
    console.error("Something went wrong in DB", err);
  });
