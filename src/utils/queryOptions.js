
export function buildQuery(params) {
    let query = {};
    for (const key in params) {
        if (params[key]) {
            query = {...query, [key]: {$regex: new RegExp(params[key], 'i')}};
        }
    }
    return query;
}


// Função de Paginação 
export function getPagination(page, perPage) {
    return{
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10
    }
}