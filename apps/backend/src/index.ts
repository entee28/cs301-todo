import "dotenv/config";
import mongoose from "mongoose";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { appRouter } from "./trpc";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const httpServer = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

const port = process.env.PORT || 4000;
httpServer.listen(port);

export type AppRouter = typeof appRouter;
