import { Sequelize } from "sequelize";

const cur_dir = path.dirname(import.meta.url.replace("file:", ""));
const db_path = path.join(cur_dir, "./dev.sqlite");

export const connection = new Sequelize(`sqlite:/${db_path}`);