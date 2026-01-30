import { User } from "../models/users";
import { Request, Response, NextFunction } from "express";
export interface UserResponse {
    success: true | false;
    statusCode: number;
    message: string;
    data?: User[] | User;
}
export declare const createUser: (req: Request, res: Response, next: NextFunction) => void;
export declare const getAllUsers: (req: Request, res: Response, next: NextFunction) => void;
export declare const getUserById: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteUserById: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateUserById: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=userController.d.ts.map