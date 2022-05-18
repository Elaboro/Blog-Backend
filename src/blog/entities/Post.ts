import {
    Entity,
    BaseEntity, 
    CreateDateColumn,
    Column,
    ObjectIdColumn,
    ObjectID,
} from "typeorm";
import { ObjectId as MongoObjectId } from "mongodb"; 

@Entity("post")
export class Post extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ default: ""})
    content: string;

    @Column()
    author: MongoObjectId;

    @CreateDateColumn()
    created: Date;
}