import { ApiProperty } from "@nestjs/swagger";
import {
    IsMongoId
} from "class-validator";

export class PostDeleteDto {
    @ApiProperty({
        example: "6278451e7fb8f600252cacbd",
        type: String,
    })
    @IsMongoId()
    readonly post_id: string;
}