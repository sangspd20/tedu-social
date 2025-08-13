import { Route } from "@core/interfaces";
import express from "express";
import mongoose from "mongoose";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { Logger } from "@core/utils";
import { errorMiddleware } from "@core/middleware";
class App {
  public app: express.Application;
  public port: string | number;
  public production: boolean;
  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.production = process.env.NODE_ENV === "production";
    this.initializeRoutes(routes);
    this.connectToDatabase();
    this.initializeMiddlewares();
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    if (this.production) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(morgan("combined"));
      this.app.use(
        cors({
          origin: process.env.CLIENT_URL,
          credentials: true,
        })
      );
    } else {
      this.app.use(morgan("dev"));
      this.app.use(
        cors({
          origin: true,
          credentials: true,
        })
      );
    }

    this.app.use(errorMiddleware);
  }
  private connectToDatabase() {
    // Replace with your MongoDB connection string
    const mongoURI = `mongodb+srv://${process.env.UserId}:${process.env.Password}@clustertedu.p5viikc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTedu`;

    mongoose
      .connect(mongoURI)
      .then(() => {
        Logger.info("MongoDB connected");
      })
      .catch((err) => {
        Logger.error("MongoDB connection error:", err);
      });
  }
}
export default App;
