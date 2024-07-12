import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginatorService } from 'src/common/paginatior.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PermissionGroupDto,
  TBasePermissionGroups,
  TCreateGroupResponse,
} from './dto';

@Injectable()
export class PermissionGroupsService {
  constructor(
    private prisma: PrismaService,
    private paginator: PaginatorService,
  ) {}

  async findAllGroups(query?: any): Promise<TBasePermissionGroups> {
    const filter: any[] = [];
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
            permissionKey: true,
          },
        },
      },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async createGroup(data: PermissionGroupDto): Promise<TCreateGroupResponse> {
    return await this.prisma.permissionGroup.create({
      data: { name: data.name },
      select: { id: true, name: true },
    });
  }

  async updateGroup(
    id: number,
    data: PermissionGroupDto,
  ): Promise<TCreateGroupResponse> {
    const group = await this.prisma.permissionGroup.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return await this.prisma.permissionGroup.update({
      where: { id },
      data: { name: data.name },
      select: { id: true, name: true },
    });
  }
  async deleteGroup(id: number): Promise<TCreateGroupResponse> {
    const group = await this.prisma.permissionGroup.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return await this.prisma.permissionGroup.delete({
      where: { id },
      select: { id: true, name: true },
    });
  }
}
