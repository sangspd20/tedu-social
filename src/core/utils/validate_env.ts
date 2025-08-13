import { cleanEnv, str } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    UserId: str(),
    Password: str(),
  });
};

export default validateEnv;
