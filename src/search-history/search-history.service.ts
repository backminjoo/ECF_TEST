import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchHistory } from './search-history.entity';

@Injectable()
export class SearchHistoryService {
  constructor(
    @InjectRepository(SearchHistory)
    private searchHistoryRepository: Repository<SearchHistory>,
  ) {}

  async createSearchHistory(keyword_id: number, user_id: number) {
    const searchHistory = this.searchHistoryRepository.create({
      keyword_id,
      user_id,
    });
    return this.searchHistoryRepository.save(searchHistory);
  }

  async findAll() {
    return this.searchHistoryRepository.find();
  }
}
