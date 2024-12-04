import express from "express";
import {Types} from "mongoose"

declare global {
    namespace Express {
        interface Request {
            user?: {
                _id: Types.ObjectId;
                name: string;
                email: string;
                
            };
        }
    }
}
