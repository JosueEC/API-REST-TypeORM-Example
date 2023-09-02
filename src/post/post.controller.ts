import { Controller, Post, Body, Get } from '@nestjs/common';
import { SavePostDto } from './dto/save-post.dto';
import { PostService } from './post.service';

@Controller('/v1/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  public async createPost(@Body() post: SavePostDto) {
    return await this.postService.savePost(post);
  }

  @Get()
  public async getPost() {
    return this.postService.findPost();
  }
}
