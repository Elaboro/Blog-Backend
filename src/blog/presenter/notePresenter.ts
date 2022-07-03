import { IUser } from "./../../common/type/types";
import { Note } from "../entities/Note";

export const notePresenter = (note: Note, user: IUser) => {
    return {
        note_id: note.id,
        content: note.content,
        created: note.created,
        author: {
            user_id: user.id,
            username: user.username,
        }
    };
};