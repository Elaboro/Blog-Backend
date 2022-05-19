import {
    Entity,
    BaseEntity, 
    CreateDateColumn,
    Column,
    ObjectIdColumn,
    ObjectID,
} from "typeorm";
import { ObjectId as MongoObjectId } from "mongodb"; 

@Entity("note")
export class Note extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ default: ""})
    content: string;

    @Column()
    author: MongoObjectId;

    @CreateDateColumn()
    created: Date;
}