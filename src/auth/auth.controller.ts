import { 
    Controller, 
    Post,
    Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/UserDto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("register")
    async register(@Body() params: UserDto): Promise<any> {
        return await this.authService.register(params);
    }

    @Post("login")
    async login(@Body() params: UserDto): Promise<any> {
        return await this.authService.login(params);
    }
}
