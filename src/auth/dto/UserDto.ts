import { IsString, Length } from "class-validator";

export class UserDto {
    @IsString({
        message: "Должен быть строкой"
    })
    @Length(5, 20, {
        message: "Не меньше 5 и не больше 20"
    })
    readonly username: string;

    @IsString({
        message: "Должен быть строкой"
    })
    @Length(4, 16, {
        message: "Не меньше 4 и не больше 16"
    })
    readonly password: string;
}