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
  async uploadMusic(file: Express.Multer.File) {
    console.log(file)
    let result = await this.authService.saveFile(file, 'music')
    console.log(result)
    return result
  }

  async create(createMusicDto: CreateMusicDto) {

  }

  findAll() {
    return `This action returns all music`;
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
