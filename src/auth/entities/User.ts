import { 
    Entity,
    BaseEntity,
    Column,
} from "typeorm";

@Entity("user")
export class User extends BaseEntity {
    @Column()
    username: string;

    @Column()
    password: string;
}
