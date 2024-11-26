import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchKeyword } from './search-keyword.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchKeyword) // typeorm의 repository를 주입받음, searchkeyword 엔티티와 연결되어 db 작업 처리
    private readonly searchKeywordRepo: Repository<SearchKeyword>, 
    // searchKeywordRepo :typeorm repository 객체, 
  ) {}

  // 검색어 저장
  async saveKeyword(data: { // data- 객체 형태로 검색어와 관련된 정보를 전달
    keyword: string;
    userId?: string;
    ip?: string;
    age?: number;
    gender?: string;
    region?: string;
  }) {
    const keywordEntry = this.searchKeywordRepo.create(data); 
    // data를 기반으로 SearchKeyword 엔티티 객체를 생성

    return await this.searchKeywordRepo.save(keywordEntry);
    // create로 생성된 객체를 db에 저장
  }

  // 인기 검색어 조회
  @Get()
  async getTrendingKeywords() {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24시간 전 시간 계산

    const results = await this.searchKeywordRepo
      .createQueryBuilder('search_keywords') // QueryBuilder - 데이터 조회
      .select('keyword') // 검색어 컬럼만 선택
      .addSelect('COUNT(keyword)', 'count') // 각 검색어의 개수를 계산
      .where('created_at >= :oneDayAgo', { oneDayAgo }) // 24시간 이내의 데이터만 필터링
      .groupBy('keyword') // 검색어별로 그룹화
      .orderBy('count', 'DESC') // 검색 횟수 기준으로 내림차순 정렬
      .limit(10) // 상위 10개의 검색어만 반환
      .getRawMany(); // queryBuilder 에서 실행되는 메서드 ->  결과를  원본 데티터 형식으로 가져옴

    return results.map((result, index) => ({
      keyword: result.keyword,
      count: parseInt(result.count, 10),
      rank: index + 1,
    }));
  }
}
