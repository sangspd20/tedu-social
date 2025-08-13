import { IndexRoute } from "./modules/index";
import App from "./app";
import dotenv from "dotenv";
import { validateEnv } from "./core/utils";
dotenv.config();

validateEnv();
const routes = [new IndexRoute()];
const app = new App(routes);

app.listen();
