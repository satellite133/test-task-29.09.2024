import { Body, Controller, Get, Param, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Controller('api/v1')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Post('add-user')
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string; user: User }> {
        const newUser = await this.usersService.createUser(createUserDto);
        return { message: 'User added successfully', user: newUser };
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-user/:id')
    async getUserById(@Param('id') id: string): Promise<User | { message: string }> {
        try {
            const user = await this.usersService.getUserById(+id);
            return user;
        } catch (error) {
            return { message: 'User not found' };
        }
    }
}
