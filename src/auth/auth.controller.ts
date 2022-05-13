import { 
    Controller, 
    Post,
    Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/UserDto';
import {
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';

@ApiTags('Account')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        summary: "Account registration."
    })
    @Post("register")
    async register(@Body() params: UserDto): Promise<any> {
        return await this.authService.register(params);
    }

    @ApiOperation({
        summary: "Account authorization."
    })
    @Post("login")
    async login(@Body() params: UserDto): Promise<any> {
        return await this.authService.login(params);
    }
}
