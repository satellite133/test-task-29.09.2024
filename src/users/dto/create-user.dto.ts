import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    name: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Phone number is required' })
    @IsString()
    phone: string;
}
