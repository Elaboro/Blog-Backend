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
    id: ObjectID;

    @Column()
    username: string;

    @Column()
    password: string;
}
