import { it, describe, beforeAll } from "vitest";
import { read, write, compare } from "./migration.js";
import { Sequelize } from "sequelize";

describe('Migration tests', () => { 

    beforeAll(() => {
        write()
    })

    it("Compare tables to models", () => {
        return compare().then(val => console.log(val))
    })

    it("Initial Migrations", () => {
        return read().then(val => console.log(val))
    })
 })