import { Module } from '@nestjs/common';
import { PaginatorService } from './paginatior.service';

@Module({
  providers: [PaginatorService],
  exports: [PaginatorService],
})
export class CommonModule {}
