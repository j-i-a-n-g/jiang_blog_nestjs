import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadMusic(
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.musicService.uploadMusic(file);
  }

  @Post('create')
  create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.create(createMusicDto)
  }

  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(+id, updateMusicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(+id);
  }
}
