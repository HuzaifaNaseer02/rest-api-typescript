import { users, User } from "../models/users"
import { Request, Response, NextFunction, response } from "express"
import { v4 as uuidv4 } from 'uuid';

export interface UserResponse {
    success: true | false;
    statusCode: number;
    message: string
    data?: User[] | User
}

const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email} = req.body
        
        if (!isEmailValid(email)){
        const result: UserResponse = {
                success: false,
                statusCode: 400,
                message: `Invalid Email Address`
            } 
            res.status(400).json(result)
            return
        }

        const newUser: User = {
            id: uuidv4(),
            name,
            email,
        }

        users.push(newUser)
        const result: UserResponse = {
            success: true,
            statusCode: 201,
            message: "Succesfully created the user",
            data: newUser
        }
        res.status(201).json(result)
    } catch (error) {
        next(error)
        
    }
}

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {

    try {
        const result: UserResponse = {
            success: true,
            statusCode: 200,
            message: "Succesfully fetched all users",
            data: users
        }
        res.json(result)
    } catch (error) {
        next(error)
        
    }
} 

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id
        const user = users.find(user => user.id === userId)
        if (!user){
            const result: UserResponse = {
                success: false,
                statusCode: 404,
                message: `No user found with id ${userId}`
            } 
            res.status(404).json(result)
            return
        }
        const result: UserResponse = {
            success: true,
            statusCode: 200,
            message: `User successfully found`,
            data: user as User
        } 
        res.json(result)
    } catch (error) {
        
    }
}

export const deleteUserById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id
        const userIndex = users.findIndex(user => user.id === userId)
        if (userIndex === -1){
            const result: UserResponse = {
                success: false,
                statusCode: 404,
                message: `No user found with id ${userId}`
            } 
            res.status(404).json(result)
            return
    }
    
    const deletedUser = users.splice(userIndex, 1)[0]
    const result: UserResponse = {
        success: true,
        statusCode: 200,
        message: `User successfully deleted`,
        data: deletedUser as User
    } 
    res.json(result)

    } catch (error) {
        next(error)
    }

}

export const updateUserById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id
        const user = users.find(user => user.id === userId)
        if (!user){
            const result: UserResponse = {
                success: false,
                statusCode: 404,
                message: `No user found with id ${userId}`
            } 
            res.status(404).json(result)
            return
        }
        const {name, email} = req.body
        if (!isEmailValid(email)){
            const result: UserResponse = {
                    success: false,
                    statusCode: 400,
                    message: `Invalid Email Address`
                } 
                res.status(400).json(result)
                return
            }
        user.name = name
        user.email = email
        const result: UserResponse = {
            success: true,
            statusCode: 200,
            message: `User successfully updated`,
            data: user as User
        } 
        res.json(result)

    } catch (error) {
        
    }
}