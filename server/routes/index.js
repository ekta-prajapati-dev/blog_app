import express from "express";
import UserRoutes from "../routes/user.js";

const routes = express();

routes.use("/user", UserRoutes);

export default routes;
