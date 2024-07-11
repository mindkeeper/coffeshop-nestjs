import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/token/guard';
import {
  PermissionResponse,
  PermissionGroupDto,
  PermissionGroupResponse,
} from './dto';
import { PermissionGuard } from 'src/token/strategy';

@ApiTags('permissions')
@ApiBearerAuth()
@Controller('admin/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiQuery({ name: 'permissionName', required: false })
  @ApiQuery({ name: 'permissionGroup', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'sortField', required: false })
  @ApiQuery({ name: 'sortDirection', required: false })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({
    status: 200,
    description: 'Return all permissions',
    type: PermissionResponse,
  })
  @UseGuards(JwtGuard, new PermissionGuard(['get-permissions']))
  async findAllPermissions(
    @Query('permissionName') permissionName: string,
    @Query('permissionGroup') permissionGroup: string,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage: number,
    @Query('sortField', new DefaultValuePipe('id')) sortField: string,
    @Query('sortDirection', new DefaultValuePipe('desc')) sortDirection: string,
  ) {
    const query = {
      permissionName,
      permissionGroup,
      page,
      sortDirection,
      sortField,
      perPage,
    };
    return await this.permissionsService.findAllPermissions(query);
  }

  @Get('groups')
  @UseGuards(JwtGuard, new PermissionGuard(['get-permission-groups']))
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'sortDirection', required: false })
  @ApiQuery({ name: 'sortField', required: false })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({
    status: 200,
    description: 'Return all groups',
    type: PermissionGroupResponse,
  })
  async findAllGroups(
    @Query('name') name?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
    @Query('sortField', new DefaultValuePipe('id')) sortField?: string,
    @Query('sortDirection', new DefaultValuePipe('desc'))
    sortDirection?: string,
  ) {
    const query = { name, page, sortDirection, sortField, perPage };
    return await this.permissionsService.findAllGroups(query);
  }

  @Get('groups/:id')
  @UseGuards(JwtGuard, new PermissionGuard(['get-permission-group-details']))
  async findGroupById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.permissionsService.findGroupById(id);
  }

  @Post('groups')
  @UseGuards(JwtGuard, new PermissionGuard(['create-permission-group']))
  async createGroup(@Body() group: PermissionGroupDto) {
    return await this.permissionsService.createGroup(group);
  }
}
