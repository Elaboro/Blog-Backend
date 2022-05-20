import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    Length,
} from "class-validator";
import { apiExample } from "./../../common/api.example";
import { message } from "./../../common/messages";

export class NoteCreateDto {
    @ApiProperty({
        example: apiExample.note.content,
        type: String,
    })
    @IsString({
        message: message.is_string
    })
    @Length(5, 300, {
        message: message.note.content.length
    })
    readonly content: string;
}