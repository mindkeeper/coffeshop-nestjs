import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginatorService } from 'src/common/paginatior.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionDto } from './dto';
import { PermissionGroupDto } from './dto/group-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    private prisma: PrismaService,
    private paginator: PaginatorService,
  ) {}

  async findAllPermissions(query?: any) {
    const filter = [];
    if (query.permissionName) {
      filter.push({
        permissionName: { contains: query.permissionName, mode: 'insensitive' },
      });
    }
    if (query.permissionGroup) {
      filter.push({
        permissionGroup: {
          name: { contains: query.permissionGroup, mode: 'insensitive' },
        },
      });
    }

    const { items, meta } = await this.paginator.paginate(
      this.prisma.permission,
      {
        where: {
          AND: filter,
        },
        select: {
          id: true,
          permissionName: true,
          perimissionKey: true,
          permissionGroup: { select: { name: true } },
        },
        orderBy: {
          [query.sortField]: query.sortDirection,
        },
      },
      { page: query.page, perPage: query.perPage },
    );

    const permissions = items.map(
      ({ permissionGroup, ...rest }: PermissionDto) => ({
        ...rest,
        permissionGroupName: permissionGroup.name,
      }),
    );

    return { items: permissions, meta };
  }
  async findAllGroups(query?: any) {
    const filter = [];
    if (query.name) {
      filter.push({ name: { contains: query.name, mode: 'insensitive' } });
    }
    return await this.paginator.paginate(
      this.prisma.permissionGroup,
      {
        where: {
          AND: filter,
        },
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          [query.sortField]: query.sortDirection,
        },
      },
      { page: query.page, perPage: query.perPage },
    );
  }

  async findGroupById(id: number) {
    const group = await this.prisma.permissionGroup.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        permissions: {
          select: {
            id: true,
            permissionName: true,
            perimissionKey: true,
          },
        },
      },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async createGroup(data: PermissionGroupDto) {
    return await this.prisma.permissionGroup.create({
      data: { name: data.name },
    });
  }
}
