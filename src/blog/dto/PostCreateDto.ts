import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    Length,
} from "class-validator";

export class PostCreateDto {
    @ApiProperty({
        example: "The text of your post.",
        type: String,
    })
    @IsString({
        message: "Должен быть строкой."
    })
    @Length(5, 300, {
        message: "Не меньше 5 и не больше 300 символов."
    })
    readonly content: string;
}