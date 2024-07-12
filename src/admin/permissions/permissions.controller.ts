import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/token/guard';
import {
  PermissionDetailResponse,
  PermissionDto,
  PermissionResponse,
  TAllPermissions,
  TPermissionDetail,
} from './dto';
import { PermissionGuard } from 'src/token/strategy';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

@ApiTags('permissions')
@ApiBearerAuth()
@UsePipes(ZodValidationPipe)
@Controller('admin/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // Permission section
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
  ): Promise<TAllPermissions> {
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

  @Get(':id')
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({
    status: 200,
    description: 'Return permission by id',
    type: PermissionDetailResponse,
  })
  @UseGuards(JwtGuard, new PermissionGuard(['get-permission-details']))
  async findPermissionById(
    @Query('id', new ParseIntPipe()) id: number,
  ): Promise<TPermissionDetail> {
    return await this.permissionsService.findPermissionById(id);
  }

  @Post()
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({
    status: 201,
    description: 'Permission created successfully',
  })
  @UseGuards(JwtGuard, new PermissionGuard(['create-permission']))
  async createPermission(@Body() body: PermissionDto) {
    return await this.permissionsService.createPermission(body);
  }
}
