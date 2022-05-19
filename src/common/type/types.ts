import { ObjectID } from "typeorm";

export interface IUser {
    id: ObjectID;
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
