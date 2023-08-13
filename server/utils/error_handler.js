const { GraphQLError } =require("graphql/error");


// an error handler constructor
class AppError extends Error {
    constructor(message, statusCode = "INTERNAL_SERVER_ERROR"){
        
        super(message);
        this.message = message;
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}

function HandleError(error) {
        throw new GraphQLError(error.message, {
            extensions: 
                {
                    code: error.statusCode
                }
        })
}

module.exports = {HandleError, AppError};