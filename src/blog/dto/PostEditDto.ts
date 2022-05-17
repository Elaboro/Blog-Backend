import { ApiProperty } from "@nestjs/swagger";
import {
    IsMongoId,
    IsString,
    Length,
} from "class-validator";

export class PostEditDto {
    @ApiProperty({
        example: "6278451e7fb8f600252cacbd",
        type: String,
    })
    @IsMongoId({
        message: "Должен быть идентификатором mongodb."
    })
    readonly id: string;

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