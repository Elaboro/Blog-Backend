import { ApiProperty } from "@nestjs/swagger";
import {
    IsMongoId,
    IsString,
    Length,
} from "class-validator";
import { apiExample } from "./../../common/api.example";
import { message } from "./../../common/messages";

export class NoteEditDto {
    @ApiProperty({
        example: apiExample.note.note_id,
        type: String,
    })
    @IsMongoId({
        message: message.is_mongo_id,
    })
    readonly note_id: string;

    @ApiProperty({
        example: apiExample.note.content,
        type: String,
    })
    @IsString({
        message: message.is_string,
    })
    @Length(5, 300, {
        message: message.note.content.length
    })
    readonly content: string;
}