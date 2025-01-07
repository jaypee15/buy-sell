import { IsString,IsEmail, MinLength, Matches } from "class-validator";

export class RequestPasswordResetDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
    @IsString()
    token: string;
    
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain uppercase, lowercase, number/special character',
      })
      password: string;
}