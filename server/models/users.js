import { connection } from "../database/index.js"

// const TABLE_NAME = "TABLE_NAME";
const TABLE_NAME = "users";


// const COLUMNS = "${COLUMNS}";
const COLUMNS = "";

function getColumns({ query }) {
    const query_attr = query.attr?.split(','); 
    const attr = null //[${COLUMNS}]

    const active_attr = !query_attr ? attr.join(", ") : attr.filter(val => query_attr.includes(val)).join(", ");
}

export default {
    find(){
        return async function(req, res, next){
            try {
                const data = await connection.query(
                    `SELECT ${active_attr} FROM \`${TABLE_NAME}\``
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
            const attr = null //[${COLUMNS}]

            const active_attr = !query_attr ? attr.join(", ") : attr.filter(val => query_attr.includes(val)).join(", ");

            try {
                const data = await connection.query(
                    `SELECT ${active_attr} FROM \`TABLE_NAME\` WHERE id = ?`,
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
                    `UPDATE \`TABLE_NAME\` SET ${COLUMNS} WHERE id = ?`,
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
                    `UPDATE \`${TABLE_NAME}\` SET ${COLUMNS} WHERE `,
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
    delete(){
        return async function (req, res, next) {
            
        }
    },
    insert(){
        return async function (req, res, next) {
            
        }
    }
}