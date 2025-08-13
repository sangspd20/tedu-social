import { IndexRoute } from "./modules/index";
import App from "./app";
import dotenv from "dotenv";
dotenv.config();

const routes = [new IndexRoute()];
const app = new App(routes);

app.listen();
