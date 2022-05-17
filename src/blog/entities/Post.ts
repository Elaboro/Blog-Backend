import {
    Entity,
    BaseEntity, 
    CreateDateColumn,
    Column,
    ObjectIdColumn,
    ObjectID,
} from "typeorm";
import { User } from "./../../auth/entities/User";

@Entity("post")
export class Post extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ default: ""})
    content: string;

    @Column(type => User)
    author: User;

    @CreateDateColumn()
    created: Date;
}