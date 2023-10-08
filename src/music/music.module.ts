import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { AuthModule } from 'src/common/module/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity]), AuthModule],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule { }
