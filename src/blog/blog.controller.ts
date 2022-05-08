import { 
    Controller, 
    Get, 
    Post,
    Put,
    Delete,
    Body,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { PostDto } from './dto/PostDto';
import { PostDeleteDto } from './dto/PostDeleteDto';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Get("post")
    async post(): Promise<string[]>
    {
        return await this.blogService.getPost();
    }

    @Post("post/create")
    async createPost(@Body() params: PostDto): Promise<string> 
    {
        return await this.blogService.createPost(params);
    }

    @Put("post/edit")
    async editPost(@Body() params: PostDto): Promise<string> 
    {
        return await this.blogService.editPost(params);
    }

    @Delete("post/delete")
    async deletePost(@Body() params: PostDeleteDto): Promise<any> 
    {
        return await this.blogService.deletePost(params);
    }
}
