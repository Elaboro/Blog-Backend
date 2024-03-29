import { ObjectId as MongoObjectId } from "mongodb";

export interface IUser {
    user_id: MongoObjectId;
    username: string;
}

export interface INoteCreate {
    user: IUser
    content: string;
} 

export interface INoteEdit {
    user: IUser
    note_id: string;
    content: string;
}

export interface INoteDelete {
    user: IUser
    note_id: string;
}

export interface IJwtToken {
    token: string;
}