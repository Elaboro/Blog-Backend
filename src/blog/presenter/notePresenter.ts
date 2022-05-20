import { IUser } from "./../../common/type/types";
import { Note } from "../entities/Note";

export const notePresenter = (note: Note, user?: IUser) => {
    return !user? {
        note_id: note.id,
        content: note.content,
        author_id: note.author,
        created: note.created,
    } : {
        note_id: note.id,
        content: note.content,
        author_id: note.author,
        created: note.created,
        author_username: user.username,
    };
};