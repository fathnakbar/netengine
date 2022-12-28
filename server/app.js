import express from "express";
import { readdir, stat } from "fs/promises"
import path from "path";

const route = express.Router()

const routesdir = path.join(path.dirname(import.meta.url.replace("file:", "")), "./routes");

readdir(routesdir).then(async files => {
    
    const apis =  files.map(async file => {

        const isfile = await stat(path.resolve(routesdir, file));
        if (isfile.isFile && path.extname(file) == ".js") {

            route.use(`/${path.basename(file, '.js')}`, (await import(path.join(routesdir, file))).default)
        }
    })

    await Promise.all(apis);

    route.use("/:name?", (req, res) => req.params.name ? res.send(`API not found ${req.params.name}`) : res.send("API not found"))
})

export default route;