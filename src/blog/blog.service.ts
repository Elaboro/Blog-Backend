import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { Note } from './entities/Note';
import {
    INoteCreate,
    INoteDelete,
    INoteEdit
} from './../common/type/types';

@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(Note) private readonly noteRepo: MongoRepository<Note>,
    ) {}

    async getNote(): Promise<Note[]> {
        return await this.noteRepo.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "author",
                    foreignField: "_id",
                    as: "author",
                    pipeline: [
                        { $addFields: { user_id: "$_id" } },
                        { $unset: ["_id", "password"] },
                    ]
                }
            },
            { $unwind: "$author" },
            { $addFields: { note_id: "$_id" } },
            { $unset: ["_id"] },
        ]).toArray();
    }

    async createNote(params: INoteCreate): Promise<Note> {
        try {
            const note: Note = new Note();
            note.content = params.content;
            note.author = params.user.user_id;
            await note.save();

            return note;
        } catch (e) {
            throw new HttpException(
                'Error create a note. ' + e,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async editNote(params: INoteEdit): Promise<Note> {
        try {
            const note_id: string = params.note_id;
            const note: Note = await this.noteRepo.findOne(note_id);

            if(!note) {
                throw new Error("Entity not found.");
            }

            if(!this.checkAuthorOfNote(params.user.user_id, note)) {
                throw new HttpException("User is not author of note.", HttpStatus.BAD_REQUEST);
            }

            await this.noteRepo.updateOne(
                { _id : note.id },
                { $set: { content: params.content } }
            );
            await note.reload();

            return note;
        } catch (e) {
            throw new HttpException(
                'Error edit a note. ' + e,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteNote(params: INoteDelete): Promise<Note> {
        try {
            const id: string = params.note_id;
            const note: Note = await Note.findOne(id);

            if(!note) {
                throw new Error("Entity not found.");
            }

            if(!this.checkAuthorOfNote(params.user.user_id, note)) {
                throw new HttpException("User is not author of note.", HttpStatus.BAD_REQUEST);
            }

            await Note.delete(note);

            return note;
        } catch (e) {
            throw new HttpException(
                'Error deleting a note. ' + e,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    private checkAuthorOfNote(author_id: ObjectID, note: Note): boolean {
        return author_id.toString() === note.author.toString()? true : false; 
    }
}
