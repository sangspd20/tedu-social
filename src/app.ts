import { Route } from "core/interfaces";
import express from "express";
import mongoose from "mongoose";

class App {
  public app: express.Application;
  public port: string | number;
  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.initializeRoutes(routes);

    this.connectToDatabase();
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private connectToDatabase() {
    // Replace with your MongoDB connection string
    const mongoURI = `mongodb+srv://${process.env.UserId}:${process.env.Password}@clustertedu.p5viikc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTedu`;

    mongoose
      .connect(mongoURI)
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });
  }
}
export default App;
