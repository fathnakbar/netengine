const _ = {
    "$api": [
        {
            "base": "/"
        },
        {
            "base": "admin"
        },
        {
            "base": "api",
            "routes": [
                {
                    "base": "users",
                    "middleware": ["file-name"]
                },
                {
                    "base": "transactions",
                    // If it has routes property, this endpoint is not a resource API. It's just a path
                     "routes": [
                        {
                            "base": "my",
                            "options": {
                                "value": true
                            },
                            "resource": ""
                        }
                     ]
                },
                {
                    "base": "wallet"
                }
                
            ]
        }
    ],
    "$database": {
        "provider": "sql",
        "tables": [
            {
                "name": "users",
                "columns": [],
                "rules": [
                    "session.status.includes('users') && row.user_id == session.user_id: column1, column2, column3 (read, update, delete)"
                ]
            },
            {
                "name": "transactions",
                "columns": [],
                "rules": (EndpointValues) => {
                    // This function return an object that can fetch to the database

                    // req is the current request
                    // session is user session
                    // row is query builder for filtering rows
                    // options is options values on endpoint
                    // current path
                    // res is available on middleware
                    const {req, session, row, options, path} = EndpointValues;
                    

                    // req.type detects 'read', 'update', 'delete', and 'create' request
                    // There must be some middleware that set req's "type" property
                    switch(req.type){
                        case "create": 
                            if(options.value && session.status.includes('users')){
                                
                            }

                            if(session.status.includes('users')){
                                
                            }

                        break;
                        case "read": 
                        break;
                        case "update": 
                        break;
                        case "delete": 
                        break;
                    }
                }
                
                // [
                //     "session.status.includes('users') && row.status == 'public': !column1 (read)",
                //     "options.value && session.status.includes('users') && wallet(row.wallet_id).user_id == session.user_id: (read, update, delete)",
                //     "session.status.includes('users') && wallet(req.wallet_id).user_id == session.user_id: (create)"
                // ]
            },
            {
                "name": "wallet",
                "columns": []
            }
        ]
    },
    "$git": {}
}