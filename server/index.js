import express from "express";
import { config } from "dotenv";
import dbConnetion from "./config/db_connetion.js";
import routes from "./routes/index.js";

config();
dbConnetion();

const app = express();
const port = process.env.PORT || 3000;

// Use built-in body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) =>
  res.json({ status: 200, message: "App is running" })
);

// All routes
app.use("/", routes);

// Optional: global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ message: "Something went wrong." });
});

app.listen(port, () => {
  console.log(`Server running on ${port} Port.`);
});
