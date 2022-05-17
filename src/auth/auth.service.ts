import {
    Injectable,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/User';
import { UserDto } from './dto/UserDto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async register(params: UserDto): Promise<object> {
        try {
            const password_hash: string = await bcrypt.hash(params.password, 8);

            const user: User = new User();
            user.username = params.username;
            user.password = password_hash;
            await user.save();

            return this.generateToken(user);
        } catch (e) {
            throw new HttpException("User is not create! " + e, HttpStatus.BAD_REQUEST);
        }
    }

    async login(params: UserDto): Promise<object> {
        try {
            const username: string = params.username;
            const password: string = params.password;

            const user: User = await User.findOne({
                where: { username: username }
            });
            if (!user) {
                throw new HttpException(
                    'Invalid username',
                    HttpStatus.UNAUTHORIZED,
                );
            }

            const is_password_equals: boolean = await bcrypt.compare(
                password,
                user.password
            );
            if(!is_password_equals) {
                throw new HttpException(
                    'Invalid password',
                    HttpStatus.UNAUTHORIZED,
                );
            }

            return this.generateToken(user);
        } catch (e) {
            throw new HttpException(
                "User is not logged in! "+ e,
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

    private generateToken(user: User): object {
        const payload: object = {
            id: user.id,
            username: user.username,
        };

        return {
            token: this.jwtService.sign(payload)
        };
    }
}
