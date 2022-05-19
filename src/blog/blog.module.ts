import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../auth/auth.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Note } from './entities/Note';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Note])
  ],
})
export class BlogModule {}
