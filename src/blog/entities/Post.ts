import { 
    Entity,
    BaseEntity, 
    CreateDateColumn,
    Column,
    ObjectIdColumn,
    ObjectID,
} from "typeorm";

@Entity("post")
export class Post extends BaseEntity {
    @ObjectIdColumn()
    post_id: ObjectID;

    @Column({ default: ""})
    content: string;

    @Column({ default: ""})
    author: string;

    @CreateDateColumn()
    created: Date;
}