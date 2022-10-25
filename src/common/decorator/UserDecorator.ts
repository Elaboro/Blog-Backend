import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IUser } from "../type/types";
import { ObjectId as MongoObjectId } from 'mongodb';

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request: Request & {
            user: IUser
        } = ctx.switchToHttp().getRequest();

        const user: IUser = request.user;
        user.user_id = new MongoObjectId(user.user_id);

        return user;
    },
);