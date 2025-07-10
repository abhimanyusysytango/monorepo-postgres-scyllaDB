import { Controller, Post, Body, Get, Query, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UsersUri } from '@demo-backend/shared';
import { SignupUserDto, LoginUserDto, RefreshTokenDto } from './dto/users.dto';

@ApiTags(UsersUri.BASE)
@Controller(UsersUri.BASE)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(UsersUri.SIGNUP)
  @ApiOperation({ summary: 'User signup' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john@example.com' },
        password: { type: 'string', example: 'password123' }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Email already in use' })
  signup(@Body() body: SignupUserDto): Promise<any> {
    return this.usersService.signup(body);
  }

  @Post(UsersUri.LOGIN)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john@example.com' },
        password: { type: 'string', example: 'password123' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() body: LoginUserDto): Promise<any> {
    return this.usersService.login(body);
  }

  @Post(UsersUri.REFRESH)
  @ApiOperation({ summary: 'Refresh user access token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refresh_token: { type: 'string', example: '...' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'New access token issued' })
  refresh(@Body() body: RefreshTokenDto): Promise<any> {
    return this.usersService.refresh(body);
  }

  @Get(UsersUri.PROFILE)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile' })
  async getProfile(@Req() req: any): Promise<any> {
    const userId = req.user?.sub;
    return this.usersService.findById(userId);
  }
} 