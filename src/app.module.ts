import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from './search/search.module';
import { SearchKeyword } from './search/search-keyword.entity';

@Module({
  imports: [
    // UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // DB 호스트
      port: 5432, // DB 포트
      username: 'testuser', // DB 사용자명
      password: '1234', // DB 비밀번호
      database: 'dev', // 사용할 데이터베이스 이름
      entities: [SearchKeyword], // 사용할 엔티티 추가 (여기서는 SearchHistory 엔티티)
      synchronize: true, // 개발 단계에서는 true로 설정, 실제 배포 시 false로 변경
    }),
  SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
