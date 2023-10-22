import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { AuthModule } from 'src/common/module/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity]), AuthModule],
  controllers: [MusicController],
  // MusicService实际就是{provide: MusicService, useValue: MusicService}简写版本，当修改useValue的时候，可以直接指向我们Mock数据进行测试
  // 也可以这样写： { provide: 'STRING_TOKEN', useValue: ["1", "2", "3"] } 使用字符串作为提供者Token，数组作为值 
  // 在service导入时： @Inject("STRING_TOKEN") stringToken: string[]
  // 除了useValue，还有其他的自定义提供者模式 useClass useFactory
  providers: [{ provide: MusicService, useClass: MusicService }],
})
export class MusicModule { }
