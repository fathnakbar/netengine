import { connection } from "../database"

function getColumns(params) {
    const query_attr = req.query.attr?.split(','); 
    const attr = null //[34cca0468b64056e94e81d4cf504192f/columns]

    const active_attr = !query_attr ? attr.join(", ") : attr.filter(val => query_attr.includes(val)).join(", ");
}

export default {
    find(){
        return async function(req, res, next){
            try {
                const data = await connection.query(
                    `SELECT ${active_attr} FROM \`34cca0468b64056e94e81d4cf504192f/table\``
                );

                res.status(200).json({data})
                
            } catch (error) {
                res.status(500).json({message: error})
            }
        }
    },
    findOne(){
        return async function (req, res, next) {

            const query_attr = req.query.attr?.split(','); 
            const attr = null //[34cca0468b64056e94e81d4cf504192f/columns]

            const active_attr = !query_attr ? attr.join(", ") : attr.filter(val => query_attr.includes(val)).join(", ");

            try {
                const data = await connection.query(
                    `SELECT ${active_attr} FROM \`34cca0468b64056e94e81d4cf504192f/table\` WHERE id = ?`,
                    {
                        replacements: [
                            req.params('id')
                        ]
                    }
                );

                res.status(200).json({data})
            } catch (error) {
                res.status(500).json({message: error})
            }
        }
    },
    updateOne(){
        return async function (req, res, next) {
            try {
                const data = await connection.query(
                    "UPDATE `34cca0468b64056e94e81d4cf504192f/table` SET 34cca0468b64056e94e81d4cf504192f/columns WHERE id = ?",
                    {
                        replacements: [
                            req.params("id")
                        ]
                    }
                );

                res.status(200).json({data})
            } catch (error) {
                res.status(500).json({message: error})
            }
        }
    },
    update(){
        return async function (req, res, next) {
            try {
                const data = await connection.query(
                    "UPDATE ? SET ? WHERE ",
                    {
                        replacements: [
                            "34cca0468b64056e94e81d4cf504192f/columns", 
                            "34cca0468b64056e94e81d4cf504192f/table",
                            req.params("id")
                        ]
                    }
                );

                res.status(200).json({data})
            } catch (error) {
                res.status(500).json({message: error})
            }
        }
    },
    delete(){
        return async function (req, res, next) {
            
        }
    },
    insert(){
        return async function (req, res, next) {
            
        }
    }
}