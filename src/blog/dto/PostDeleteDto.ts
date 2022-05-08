import {
    IsMongoId
} from "class-validator";
import { ObjectID } from "typeorm";

export class PostDeleteDto {
    @IsMongoId()
    readonly post_id: ObjectID;
}