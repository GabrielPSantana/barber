import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import StoreRotes from "./routes/store.routes";
import UserRoutes from "./routes/user.routes";
const PORT = 5000;

async function startup() {
  await createConnection();
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/user", UserRoutes);
  app.use("/store", StoreRotes);
  app.listen(PORT, () => {
    console.log("App running on port " + PORT);
  });
}

startup();