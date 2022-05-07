import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BlogModule,
    AuthModule
  ]
})
export class AppModule {}
