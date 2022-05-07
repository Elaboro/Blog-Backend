import { 
    Controller, 
    Get, 
    Post,
    Put,
    Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Get("post")
    async post(): Promise<string[]>
    {
        return await this.blogService.getPost();
    }

    @Post("post/create")
    async createPost(): Promise<string> 
    {
        return await this.blogService.createPost();
    }

    @Put("post/edit")
    async editPost(): Promise<string> 
    {
        return await this.blogService.editPost();
    }

    @Delete("post/delete/:id")
    async deletePost(): Promise<number> 
    {
        return await this.blogService.deletePost();
    }
}
