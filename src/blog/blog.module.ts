import { Module } from '@nestjs/common';
import { AuthModule } from './../auth/auth.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [AuthModule],
})
export class BlogModule {}
