import { Injectable } from '@nestjs/common';
import { PaginatorService } from 'src/common/paginatior.service';
import { PrismaService } from 'src/prisma/prisma.service';

type TPermission = {
  id: number;
  permissionName: string;
  perimissionKey: string; // Note the typo here, it should match the Prisma schema if it's a typo there as well.
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
      ({ permissionGroup, ...rest }: TPermission) => ({
        ...rest,
        permissionGroupName: permissionGroup.name,
      }),
    );

    return { items: permissions, meta };
  }
}
