import express from 'express';
import admin from "./routes/admin.js";
import apis from "../server/app.js"

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("views"))

// app.get('admin', (req, res) => res.send('Hello World! from admin'));

app.get('/', (req, res) => res.send('Hello World! from index'));


app.use("/admin", admin);
app.use("/api", apis);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))