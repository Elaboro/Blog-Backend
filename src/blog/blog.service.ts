import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PostCreateDto } from './dto/PostCreateDto';
import { Post } from './entities/Post';
import { PostDeleteDto } from './dto/PostDeleteDto';
import { PostEditDto } from './dto/PostEditDto';
import { User } from './../auth/entities/User';

@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(Post) private readonly postRepo: MongoRepository<Post>,
    ) {}

    async getPost(): Promise<Post[]> {
        return await this.postRepo.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "post.author",
                    foreignField: "id",
                    as: "author",
                    pipeline: [
                        { $addFields: { user_id: "$_id" } },
                        { $unset: ["_id", "password"] },
                    ]
                }
            },
            { $unwind: "$author" },
            { $addFields: { post_id: "$_id" } },
            { $unset: ["_id"] },
        ]).toArray();
    }

    async createPost(user_data: User, params: PostCreateDto): Promise<Post> {
        try {
            const user: User = await User.findOne(user_data.id, {
                select: ["id"]
            });

            const post: Post = new Post();
            post.content = params.content;
            post.author = user;
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
            const id: string = params.id;
            const post: Post = await Post.findOne(id);

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
            const id: string = params.id;
            const post: Post = await Post.findOne(id);

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
