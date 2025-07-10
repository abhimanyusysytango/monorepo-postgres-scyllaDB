import { IsString, IsBoolean } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}

export class RefreshTokenDto {
  @IsString()
  refresh_token!: string;
}

export class SetUserActiveStatusDto {
  @IsBoolean()
  is_active!: boolean;
} 