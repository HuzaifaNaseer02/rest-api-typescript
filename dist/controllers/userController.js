"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const users_1 = require("../models/users");
const uuid_1 = require("uuid");
const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};
const createUser = (req, res, next) => {
    try {
        const { name, email } = req.body;
        const newUser = {
            id: (0, uuid_1.v4)(),
            name,
            email,
        };
        if (!isEmailValid(email)) {
            const result = {
                success: false,
                statusCode: 400,
                message: `Invalid Email Address`
            };
            res.status(400).json(result);
            return;
        }
        users_1.users.push(newUser);
        const result = {
            success: true,
            statusCode: 201,
            message: "Succesfully created the user",
            data: newUser
        };
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const getAllUsers = (req, res, next) => {
    try {
        const result = {
            success: true,
            statusCode: 200,
            message: "Succesfully fetched all users",
            data: users_1.users
        };
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = users_1.users.find(user => user.id === userId);
        if (!user) {
            const result = {
                success: false,
                statusCode: 404,
                message: `No user found with id ${userId}`
            };
            res.status(404).json(result);
            return;
        }
        const result = {
            success: true,
            statusCode: 200,
            message: `User successfully found`,
            data: user
        };
        res.json(result);
    }
    catch (error) {
    }
};
exports.getUserById = getUserById;
const deleteUserById = (req, res, next) => {
    try {
        const userId = req.params.id;
        const userIndex = users_1.users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            const result = {
                success: false,
                statusCode: 404,
                message: `No user found with id ${userId}`
            };
            res.status(404).json(result);
            return;
        }
        const deletedUser = users_1.users.splice(userIndex, 1)[0];
        const result = {
            success: true,
            statusCode: 200,
            message: `User successfully deleted`,
            data: deletedUser
        };
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUserById = deleteUserById;
const updateUserById = (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = users_1.users.find(user => user.id === userId);
        if (!user) {
            const result = {
                success: false,
                statusCode: 404,
                message: `No user found with id ${userId}`
            };
            res.status(404).json(result);
            return;
        }
        const { name, email } = req.body;
        if (!isEmailValid(email)) {
            const result = {
                success: false,
                statusCode: 400,
                message: `Invalid Email Address`
            };
            res.status(400).json(result);
            return;
        }
        user.name = name;
        user.email = email;
        const result = {
            success: true,
            statusCode: 200,
            message: `User successfully updated`,
            data: user
        };
        res.json(result);
    }
    catch (error) {
    }
};
exports.updateUserById = updateUserById;
//# sourceMappingURL=userController.js.map