import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import {SearchKeyword} from './search-keyword.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([SearchKeyword]), // 검색어 엔티티 사용할 수 있게 등록.
  ],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}
