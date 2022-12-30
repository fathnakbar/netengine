import { it, describe, beforeAll } from "vitest";
import { read, write, compare } from "./migration.js";
import { Sequelize } from "sequelize";

describe('Migration tests', () => { 

    beforeAll(async () => {
        return await write(true);
    });

    it("Compare tables to models", async () => {
        const database = await read();
        const result = await compare(database);

    })

    it.skip("Initial Migrations", async () => {
        return read().then(val => console.log(JSON.stringify(val)))
    })
 })