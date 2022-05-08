import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostDto } from './dto/PostDto';
import { Post } from './entities/Post';
import { PostDeleteDto } from './dto/PostDeleteDto';
import { ObjectID, getMongoRepository } from 'typeorm';

@Injectable()
export class BlogService {
    async getPost(): Promise<string[]> {
        return [
            "Post",
            "Post",
            "Post",
        ];
    }

    async createPost(params: PostDto): Promise<string> {
        try {
            const post: Post = new Post();
            post.content = params.content;
            await post.save();

            return;
        } catch (e) {}
    }

    async editPost(params: PostDto): Promise<string> {
        return;
    }

    async deletePost(params: PostDeleteDto): Promise<ObjectID> {
        try {
            const post_id: any = params.post_id;
            console.log(post_id);

            const repo = getMongoRepository(Post);
            const post: Post = await repo.findOne({post_id : post_id});
            console.log(post);
            if(typeof post === 'undefined') return;

            await Post.delete({post_id});
            return post_id;
        } catch (e) {
            throw new HttpException(
                'Error deleting a post.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
