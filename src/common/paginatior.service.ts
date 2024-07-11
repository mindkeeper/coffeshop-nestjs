import { Injectable } from '@nestjs/common';
import { PaginateFunction, paginator } from 'src/utils/paginator';

@Injectable()
export class PaginatorService {
  paginate: PaginateFunction = paginator({ perPage: 10, page: 1 });
}
