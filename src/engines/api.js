import blueprints from "../blueprint.json"

const tables = blueprints.$database.tables;
const api_routes = blueprints.$api;


const hash = "34cca0468b64056e94e81d4cf504192f"
const tags = new Proxy({}, {
    get(target, prop){
        return `${hash}/${prop}`
    }
})

function middleware(params) {
    
}

function rules(params) {
    
}

function createRoutes(route) {
    const model = tables.filter((table) => table.name == route.base)[0]
    console.log(model)
}

function ruleParser(params) {
    
}

function createModels(params) {
    
}

function queryBuilder(params) {
    
}

export function init() {
    const recursive = (routes) => {
        const subroutes = [];
        routes.forEach(route => {
            const {routes, base} = route;
            
            createRoutes(route)


            if (routes) {
                subroutes.push(...routes)
            }
        })

        if (subroutes.length > 0) {
            recursive(subroutes);
        }
    }

    recursive(api_routes);
}