import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostCreateDto } from './dto/PostCreateDto';
import { Post } from './entities/Post';
import { PostDeleteDto } from './dto/PostDeleteDto';
import { PostEditDto } from './dto/PostEditDto';

@Injectable()
export class BlogService {
    async getPost(): Promise<Post[]> {
        return await Post.find();
    }

    async createPost(params: PostCreateDto): Promise<Post> {
        try {
            const post: Post = new Post();
            post.content = params.content;
            post.author = "Stub Author";
            await post.save();

            return post;
        } catch (e) {
            throw new HttpException(
                'Error create a post. ' + e,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async editPost(params: PostEditDto): Promise<Post> {
        try {
            const post_id: string = params.post_id;
            const post: Post = await Post.findOne(post_id);

            if(!post) {
                throw new Error("Entity not found.");
            }

            post.content = params.content;
            await post.save();

            return post;
        } catch (e) {
            throw new HttpException(
                'Error edit a post. ' + e,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deletePost(params: PostDeleteDto): Promise<Post> {
        try {
            const post_id: string = params.post_id;
            const post: Post = await Post.findOne(post_id);

            if(!post) {
                throw new Error("Entity not found.");
            }

            await Post.delete(post);

            return post;
        } catch (e) {
            throw new HttpException(
                'Error deleting a post. ' + e,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
