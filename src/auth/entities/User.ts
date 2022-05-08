import { 
    Entity,
    BaseEntity,
    Column,
    ObjectIdColumn,
    ObjectID,
} from "typeorm";

@Entity("user")
export class User extends BaseEntity {
    @ObjectIdColumn()
    user_id: ObjectID;

    @Column()
    username: string;

    @Column()
    password: string;
}
