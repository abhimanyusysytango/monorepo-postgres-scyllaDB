import { Controller, Post, Body, Get, UseGuards, Req, Patch, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AdminUri } from '@demo-backend/shared';
import { AuthGuard } from '@nestjs/passport';
import { LoginAdminDto, RefreshTokenDto, SetUserActiveStatusDto } from './dto/admin.dto';

@ApiTags(AdminUri.BASE)
@Controller(AdminUri.BASE)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post(AdminUri.LOGIN)
  @ApiOperation({ summary: 'Admin login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'admin1' },
        password: { type: 'string', example: 'admin123' }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4xIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM5MjM0NTY3LCJleHAiOjE2MzkyMzgxNjd9.example' },
        refresh_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4xIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM5MjM0NTY3LCJleHAiOjE2MzkyNjQ1Njd9.example' },
        admin: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'admin1' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() body: LoginAdminDto): Promise<any> {
    return this.adminService.login(body.username, body.password);
  }

  @Post(AdminUri.REFRESH)
  @ApiOperation({ summary: 'Refresh admin access token' })
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
    return this.adminService.refresh(body.refresh_token);
  }

  @Get(AdminUri.PROFILE)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get admin profile' })
  @ApiResponse({ status: 200, description: 'Return admin profile' })
  async getProfile(@Req() req: any): Promise<any> {
    const adminId = req.user?.sub;
    return this.adminService.findById(adminId);
  }

  @Get(AdminUri.USERS)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<any> {
    return this.adminService.getAllUsers(page, limit);
  }

  @Patch(AdminUri.USER_ACTIVATE)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Activate/Deactivate a user' })
  @ApiBody({ schema: { type: 'object', properties: { is_active: { type: 'boolean', example: true } } } })
  @ApiResponse({ status: 200, description: 'User activation status updated' })
  async setUserActiveStatus(
    @Param('id') id: number,
    @Body() body: SetUserActiveStatusDto
  ): Promise<any> {
    return this.adminService.setUserActiveStatus(id, body.is_active);
  }
} 