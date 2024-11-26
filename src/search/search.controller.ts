import { Body, Controller, Get, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { truncateSync } from 'fs';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}
    
    // 검색어 저장 api
    @Post('keywords')
    async savedKeyword(@Body() body: any){
        const {keyword, userId, ip, age, gender, region} = body;
        const savedKeyword = await this.searchService.saveKeyword({
            keyword, 
            userId, 
            ip,
            age,
            gender,
            region,
        });
        console.log('saved keyword:' , savedKeyword)
        return {
            success: true,
            data: savedKeyword,
        };
    }    

    // 인기 검색어 조회 api
    @Get('trending')
    async getTrendingKeywords(){
        const keywords = await this.searchService.getTrendingKeywords();
        return {
            success: true,
            data: keywords,
        };
    }
}

