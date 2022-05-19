import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { Note } from './blog/entities/Note';
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
        Note, 
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
