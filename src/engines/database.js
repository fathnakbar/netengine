import { Sequelize, DataTypes } from "sequelize";
import deepEqual from "deep-equal";
import path from "path";
import blueprint from "../blueprint.json"

const db_path = path.join("/database/dev.sqlite");

const operation = Symbol("operation");

const sequelize = new Sequelize(`sqlite:/${db_path}`);
const queryInterface = sequelize.getQueryInterface();

// This reads the db file 
export async function read(){

    console.log(db_path)
    const table_list = await queryInterface.showAllTables();
    const describes = table_list.map(async (table) => {
        return {
            [table]: await queryInterface.describeTable(table)
        }
    })

    const tables = (await Promise.all(describes));

    
    return tables;
}

export function compare(database=[]){
    const defaultProps = {
        "allowNull": true,
        "primaryKey": false,
        "unique": false,
        defaultValue: undefined
    }

    const re = /([A-z]+)(\((.+)\)){0,1}/g;

    const parseType = (opt) => {

        opt = typeof opt === "string" ? opt : opt.type;

        let parsed;
        parsed = Array.from(opt.matchAll(re))[0];
        
        if (!parsed) {
            return
        }

        let [name, args] = [parsed[1], parsed[3]];

        if (!name) {
            return
        }
        
        const datatype = DataTypes[name.toUpperCase()];

        if (args && typeof datatype === "function") {
            args = args.match(",") ? args.split(",") : args;
            return DataTypes[name.toUpperCase()].apply(null, Array.isArray(args) ? args : [args]);
        }

        return datatype;
    }

    const toSql = (type) => {
        if (type.toSql) {
            return type.toSql();
        }

        return type().toSql()
    }

    let models = {};
    

    blueprint.$database.tables.forEach(table => {
        const description = table.columns;
        for (const [attribute, opt] of Object.entries(description)) {
            if (typeof opt === "string") {
                let type = parseType(opt);
                description[attribute] = {...defaultProps, type};
            }
            
            if (typeof opt === "object") {
                let type = parseType(opt);
                description[attribute] = {...defaultProps,...opt, type};
            }
        }

        models[table.name] = description;
    });

    const find = (ob, key) => {
        return Array.from(ob).filter(val => Object.keys(val).includes(key))[0]
    }

    const exclude = (ob, keys) => {
        return Object.entries(ob).filter(([key, values]) => !keys.includes(key))
    }

     // Compare for creation and alteration operations
     Object.entries(models).forEach(([table, attr]) => {
        const database_table = find(database, table);

        if (database_table) {
            Object.entries(attr).forEach(([columnName, _properties]) => {
                const properties = Object.assign({}, _properties);
                if (properties.type) {
                    properties.type = toSql(properties.type);
                }
                const table_columns = database_table[table][columnName];
                
                if (table_columns) {
                    if (!deepEqual(table_columns, properties)) {
                        models[table][columnName][operation] = "changeColumn";
                    }
                } else {
                    models[table][columnName][operation] = "addColumn";
                }
            })
        } else {
            models[table][operation] = "createTable"
        }
    });

    Array.from(database).forEach((table) => {
        const name = Object.keys(table)[0];
        if (!models[name]) {
            models[name] = {
                [operation]: " dropTable"
            }
        } else {
            exclude(table[name], ['id', 'updatedAt', 'createdAt']).forEach(([key, values]) => {
                if (!models[name][key]) {
                    models[name][key] = {
                        [operation]: "removeColumn"
                    }
                }
            })
        }
    })

    return models;
}

export async function write(tables){
    if (!tables) {
        return
    }

    const defaultColumns =   {
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

      for (const [table_name, table_description] of Object.entries(tables)) {
          
        const table_operation = table_description[operation];
        const description = Object.assign({}, defaultColumns, table_description)

        console.log(description)

        if (table_operation) {
            queryInterface[table_operation](table_name, description)
            continue;
        }

        for (const [column_name, options] of description) {
            attr_operation = options[operation];
            queryInterface[attr_operation](table_name, column_name, options);
        }
      }
        
}


function plant_seeds(params) {
    
}