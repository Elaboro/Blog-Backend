import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
    async getPost(): Promise<string[]> {
        return [
            "Post",
            "Post",
            "Post",
        ];
    }

    async createPost(): Promise<string> {
        return;
    }

    async editPost(): Promise<string> {
        return;
    }

    async deletePost(): Promise<number> {
        return;
    }
}
