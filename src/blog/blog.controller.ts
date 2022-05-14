import { 
    Controller, 
    Get, 
    Post,
    Put,
    Delete,
    Body,
    UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { PostCreateDto } from './dto/PostCreateDto';
import { PostDeleteDto } from './dto/PostDeleteDto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';
import { Post as BlogPost } from './entities/Post';
import { PostEditDto } from './dto/PostEditDto';
import { JwtAuthGuard } from './../auth/guard/auth.guard';

@ApiTags("Blog")
@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}
    @ApiOperation({
        summary: "Get all posts.",
        description: "Get all the data of all posts.",
    })
    @Get("post")
    async post(): Promise<BlogPost[]>
    {
        return await this.blogService.getPost();
    }

    @ApiOperation({
        summary: "Create a post."
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post("post/create")
    async createPost(@Body() params: PostCreateDto): Promise<BlogPost> 
    {
        return await this.blogService.createPost(params);
    }

    @ApiOperation({
        summary: "Edit a post."
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put("post/edit")
    async editPost(@Body() params: PostEditDto): Promise<BlogPost> 
    {
        return await this.blogService.editPost(params);
    }

    @ApiOperation({
        summary: "Delete a post.",
        description: "You must specify the id of the post being deleted.",
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete("post/delete")
    async deletePost(@Body() params: PostDeleteDto): Promise<BlogPost> 
    {
        return await this.blogService.deletePost(params);
    }
}
