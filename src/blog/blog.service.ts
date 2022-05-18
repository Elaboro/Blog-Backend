import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId as MongoObjectId } from "mongodb";
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
                    localField: "author",
                    foreignField: "_id",
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
            const post: Post = new Post();
            post.content = params.content;
            post.author = MongoObjectId(user_data.id);
            await post.save();

            return post;
        } catch (e) {
            throw new HttpException(
                'Error create a post. ' + e,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async editPost(params: PostEditDto, user: User): Promise<Post> {
        try {
            const post_id: string = params.id;
            const post: Post = await this.postRepo.findOne(post_id);

            if(!post) {
                throw new Error("Entity not found.");
            }

            if(!this.checkAuthorOfPost(user, post)) {
                throw new HttpException("User is not author of post.", HttpStatus.BAD_REQUEST);
            }

            await this.postRepo.updateOne(
                { _id : post.id },
                { $set: { content: params.content } }
            );

            return post;
        } catch (e) {
            throw new HttpException(
                'Error edit a post. ' + e,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deletePost(params: PostDeleteDto, user: User): Promise<Post> {
        try {
            const id: string = params.id;
            const post: Post = await Post.findOne(id);

            if(!post) {
                throw new Error("Entity not found.");
            }

            if(!this.checkAuthorOfPost(user, post)) {
                throw new HttpException("User is not author of post.", HttpStatus.BAD_REQUEST);
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

    private checkAuthorOfPost(author: User, post: Post): boolean {
        return author.id.toString() === post.author.toString()? true : false; 
    }
}
