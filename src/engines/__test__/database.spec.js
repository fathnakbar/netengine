import { it, describe, beforeAll } from "vitest";
import { read, write, compare } from "../database.js";
import { Sequelize } from "sequelize";

describe('Migration tests', () => { 

    // beforeAll(async () => {
    //     return await write(true);
    // });

    // it("Compare tables to models", async () => {
    //     const database = await read();
    //     const result = await compare(database);

    // })

    // it("Read tables from datbase", () => {
    //     return read().then(val => console.log(val));
    // })

    it("Write to database from blueprint", async () => {
        const database = await read();
        const result = await compare(database);
        await write(result)

        console.log(await read());
    })

 })