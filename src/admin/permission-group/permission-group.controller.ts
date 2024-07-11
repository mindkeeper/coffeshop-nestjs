import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/token/guard';
import {
  CreateGroupResponse,
  PermissionGroupDto,
  PermissionGroupResponse,
  TBasePermissionGroups,
  TCreateGroupResponse,
  TPermissionDetail,
} from './dto';
import { PermissionGuard } from 'src/token/strategy';
import { PermissionGroupsService } from './permission-group.service';

@ApiTags('permission-groups')
@ApiBearerAuth()
@Controller('admin/permissions')
export class PermissionGroupController {
  constructor(
    private readonly permissionGroupService: PermissionGroupsService,
  ) {}

  // Group section
  @Get('groups')
  @UseGuards(JwtGuard, new PermissionGuard(['get-permission-groups']))
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'sortDirection', required: false })
  @ApiQuery({ name: 'sortField', required: false })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({ type: PermissionGroupResponse })
  async findAllGroups(
    @Query('name') name?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
    @Query('sortField', new DefaultValuePipe('id')) sortField?: string,
    @Query('sortDirection', new DefaultValuePipe('desc'))
    sortDirection?: string,
  ): Promise<TBasePermissionGroups> {
    const query = { name, page, sortDirection, sortField, perPage };
    return await this.permissionGroupService.findAllGroups(query);
  }

  @Get('groups/:id')
  @UseGuards(JwtGuard, new PermissionGuard(['get-permission-group-details']))
  async findGroupById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<TPermissionDetail> {
    return await this.permissionGroupService.findGroupById(id);
  }

  @Post('groups')
  @UseGuards(JwtGuard, new PermissionGuard(['create-permission-group']))
  @ApiResponse({ status: 403, description: 'Forbidden Resource' })
  @ApiResponse({
    status: 201,
    description: 'Group created successfully',
    type: CreateGroupResponse,
  })
  async createGroup(
    @Body() group: PermissionGroupDto,
  ): Promise<TCreateGroupResponse> {
    return await this.permissionGroupService.createGroup(group);
  }

  @Patch('groups/:id')
  @UseGuards(JwtGuard, new PermissionGuard(['update-permission-group']))
  @ApiResponse({ status: 403, description: 'Forbidden Resource' })
  @ApiResponse({
    status: 200,
    description: 'Group updated successfully',
    type: CreateGroupResponse,
  })
  async updateGroup(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() group: PermissionGroupDto,
  ): Promise<TCreateGroupResponse> {
    return await this.permissionGroupService.updateGroup(id, group);
  }

  @Delete('groups/:id')
  @UseGuards(JwtGuard, new PermissionGuard(['delete-permission-group']))
  @ApiResponse({ status: 403, description: 'Forbidden Resource' })
  @ApiResponse({
    status: 200,
    description: 'Group deleted successfully',
    type: CreateGroupResponse,
  })
  async deleteGroup(@Param('id', new ParseIntPipe()) id: number) {
    return await this.permissionGroupService.deleteGroup(id);
  }
}
