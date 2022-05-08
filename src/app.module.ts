import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { Post } from './blog/entities/Post';
import { User } from './auth/entities/User';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      ssl: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [
        Post, 
        User,
      ],
      synchronize: true,
      logging: true,
    }),
    BlogModule,
    AuthModule
  ]
})
export class AppModule {}
