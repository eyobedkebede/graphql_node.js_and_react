//App ERROR
const {HandleError, AppError} = require("../utils/error_handler");
const UserModel = require("../models/user/index")

// resolver
exports.resolvers = {
    Query: {
        getUser: async (_, input) => { //input = {id}
            try {
                const user = await UserModel.findById(input.id);
                if (!user) {
                    throw new AppError("User does not exists", "BAD_USER_INPUT")
                 }

                return user
            } catch (error) {
                HandleError(error)
            }
        },
        getAllUsers : async (_, __) =>{
            try{
                const users = await UserModel.find();
                return users
            }catch(err){
                HandleError(err)
            }
        }
    },
    Mutation: {
        addUser: async (_, input) => { //input = {first_name, last_name, ...}
            try {
                //call custom-bilt authorization functions

                // perform input validatons 

                //other operations
                // const existingUser = await UserModel.findOne({
                //     email: input.email
                // });

                // if (!existingUser) {
                //     throw new AppError("Email already exists", "BAD_USER_INPUT")
                // }

                const user = await UserModel.create(input);
                return {
                    message: "Successfuly created!!",
                    user
                };
            } catch (error) {
                HandleError(error)
            }
        }
    }
}