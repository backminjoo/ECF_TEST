import { Controller, Get, Post, Body } from '@nestjs/common';
import { SearchHistoryService } from './search-history.service';

@Controller('search-history')
export class SearchHistoryController {
  constructor(private readonly searchHistoryService: SearchHistoryService) {}

  @Post()
  create(
    @Body() createSearchHistoryDto: { keyword_id: number; user_id: number },
  ) {
    return this.searchHistoryService.createSearchHistory(
      createSearchHistoryDto.keyword_id,
      createSearchHistoryDto.user_id,
    );
  }

  @Get()
  findAll() {
    return this.searchHistoryService.findAll();
  }
}
