import { ApiProperty } from "@nestjs/swagger";
import {
    IsMongoId
} from "class-validator";
import { apiExample } from "./../../common/api.example";
import { message } from "./../../common/messages";

export class NoteDeleteDto {
    @ApiProperty({
        example: apiExample.note.note_id,
        type: String,
    })
    @IsMongoId({
        message: message.is_mongo_id,
    })
    readonly note_id: string;
}