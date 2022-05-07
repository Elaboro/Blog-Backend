import { 
    Entity,
    BaseEntity, 
    CreateDateColumn,
    Column,
} from "typeorm";

@Entity("post")
export class Post extends BaseEntity {
    @Column({ default: ""})
    content: string;

    @Column({ default: ""})
    author: string;

    @CreateDateColumn()
    created: Date;
}