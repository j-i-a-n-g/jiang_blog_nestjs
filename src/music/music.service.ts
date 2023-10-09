import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { AuthService } from 'src/common/module/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusicService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(MusicEntity)
    private musicEntity: Repository<MusicEntity>
  ) { }
  async uploadMusic(file: Express.Multer.File, path: string) {
    let result = await this.authService.saveFile(file, path)
    return result
  }

  async create(createMusicDto: CreateMusicDto) {
    let music = await this.musicEntity.create(createMusicDto)
    music.m_tag = this.authService.generateRandomString('MUSIC', 12)
    if (!music.m_author) {
      music.m_author = "(未知)"
    }
    if (!music.m_desc) {
      music.m_desc = "(暂无)"
    }
    if (!music.m_language) {
      music.m_language = "(未知)"
    }
    return await this.musicEntity.save(music)
  }

  async findAll() {
    return await this.musicEntity.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} music`;
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`;
  }

  remove(id: number) {
    return `This action removes a #${id} music`;
  }
}
