import { Sequelize, QueryTypes } from "sequelize";
import { readFile } from "fs/promises";
import path from "path";

const cur_dir = path.dirname(import.meta.url.replace("file:", ""));
const db_path = path.join(cur_dir, "./dev.sqlite");

console.log(db_path);

// This reads the db file 
export async function read(){

    const sequelize = new Sequelize(`sqlite:/${db_path}`);
    const queryInterface = sequelize.getQueryInterface();


    const table_list = await queryInterface.showAllTables();
    const describes = table_list.map(async (table) => {
        return {
            [table]: await queryInterface.describeTable(table)
        }
    })

    const tables = (await Promise.all(describes));

    
    return tables;
}

export async function compare(){
    let models = (await readFile(path.join(cur_dir, './blueprints.json'))).toString();
    models = JSON.parse(models);

    for (const table in models) {
        if (Object.hasOwnProperty.call(models, table)) {
            const description = models[table];
            for (const [attribute, opt] of Object.entries(description)) {
                if (typeof opt === "string" && Object.keys(Sequelize).includes(opt.toUpperCase())) {
                    description[attribute] = Sequelize[opt.toUpperCase()];
                }
            }

            models[table] = description;
            // TODO: compare with database, give 'operation' property
            // that have 3 states: remove, alter, and new to the table and attributes
        }
    }
    
    return models;
}

export async function write(tables){
    if (!tables) {
        return
    }

    const _ =   {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      }

      for (const [name, attributes] of Object.entries(tables)) {
      }
}