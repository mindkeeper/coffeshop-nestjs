import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PaginatorService } from 'src/common/paginatior.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionDto, TAllPermissions, TPermissionQuery } from './dto';

type TPermission = {
  id: number;
  permissionName: string;
  permissionKey: string; // Note the typo here, it should match the Prisma schema if it's a typo there as well.
  permissionGroup: {
    name: string;
  };
  permissionGroupName: string;
};
@Injectable()
export class PermissionsService {
  constructor(
    private prisma: PrismaService,
    private paginator: PaginatorService,
  ) {}

  async findAllPermissions(query: TPermissionQuery): Promise<TAllPermissions> {
    const filter: any[] = [];
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
          permissionKey: true,
          permissionGroup: { select: { name: true } },
        },
        orderBy: {
          [query.sortField]: query.sortDirection,
        },
      },
      { page: query.page, perPage: query.perPage },
    );
    const itemsData = items as TPermission[];
    const permissions = itemsData.map(({ permissionGroup, ...rest }) => ({
      ...rest,
      permissionGroupName: permissionGroup.name,
    }));

    return { items: permissions, meta };
  }

  async findPermissionById(id: number) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
      select: {
        id: true,
        permissionName: true,
        permissionKey: true,
        permissionGroup: { select: { name: true } },
        roles: {
          select: { role: { select: { roleKey: true, roleName: true } } },
        },
      },
    });

    if (!permission) {
      throw new NotFoundError('Permission not found');
    }

    const { permissionGroup, ...rest } = permission;
    const permissionGroupName = permissionGroup.name;
    const mappedRoles = permission.roles.map(({ role }) => role);

    return {
      ...rest,
      roles: mappedRoles,
      permissionGroupName,
    };
  }
  async createPermission(data: PermissionDto) {
    await this.prisma.permission.createMany({
      data,
    });
  }
}
