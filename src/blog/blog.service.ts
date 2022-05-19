import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId as MongoObjectId } from "mongodb";
import { NoteCreateDto } from './dto/NoteCreateDto';
import { Note } from './entities/Note';
import { NoteDeleteDto } from './dto/NoteDeleteDto';
import { NoteEditDto } from './dto/NoteEditDto';
import { User } from './../auth/entities/User';

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

    async createNote(user_data: User, params: NoteCreateDto): Promise<Note> {
        try {
            const note: Note = new Note();
            note.content = params.content;
            note.author = MongoObjectId(user_data.id);
            await note.save();

            return note;
        } catch (e) {
            throw new HttpException(
                'Error create a note. ' + e,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async editNote(params: NoteEditDto, user: User): Promise<Note> {
        try {
            const note_id: string = params.id;
            const note: Note = await this.noteRepo.findOne(note_id);

            if(!note) {
                throw new Error("Entity not found.");
            }

            if(!this.checkAuthorOfNote(user, note)) {
                throw new HttpException("User is not author of note.", HttpStatus.BAD_REQUEST);
            }

            await this.noteRepo.updateOne(
                { _id : note.id },
                { $set: { content: params.content } }
            );

            return note;
        } catch (e) {
            throw new HttpException(
                'Error edit a note. ' + e,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteNote(params: NoteDeleteDto, user: User): Promise<Note> {
        try {
            const id: string = params.id;
            const note: Note = await Note.findOne(id);

            if(!note) {
                throw new Error("Entity not found.");
            }

            if(!this.checkAuthorOfNote(user, note)) {
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

    private checkAuthorOfNote(author: User, note: Note): boolean {
        return author.id.toString() === note.author.toString()? true : false; 
    }
}
