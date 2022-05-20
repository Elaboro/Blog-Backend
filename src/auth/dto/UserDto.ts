import {
    IsString,
    Length
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { message } from "./../../common/messages";
import { apiExample } from "./../../common/api.example";

export class UserDto {
    @ApiProperty({
        example: apiExample.user.username,
        type: String,
    })
    @IsString({
        message: message.is_string
    })
    @Length(4, 20, {
        message: message.user.username_length,
    })
    readonly username: string;

    @ApiProperty({
        example: apiExample.user.password,
        type: String,
    })
    @IsString({
        message: message.is_string
    })
    @Length(4, 16, {
        message: message.user.password_length,
    })
    readonly password: string;
}