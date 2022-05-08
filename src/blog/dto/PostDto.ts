import {
    IsString, Length
} from "class-validator";

export class PostDto {
    @IsString({
        message: "Должен быть строкой"
    })
    @Length(5, 20, {
        message: "Не меньше 5 и не больше 20"
    })
    readonly content: string;

}