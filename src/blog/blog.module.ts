import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../auth/auth.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Post } from './entities/Post';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Post])
  ],
})
export class BlogModule {}
