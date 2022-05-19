import { 
    Controller, 
    Get, 
    Post,
    Put,
    Delete,
    Body,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { NoteCreateDto } from './dto/NoteCreateDto';
import { NoteDeleteDto } from './dto/NoteDeleteDto';
import { Note } from './entities/Note';
import { NoteEditDto } from './dto/NoteEditDto';
import { JwtAuthGuard } from './../auth/guard/auth.guard';
import { User } from './../common/decorator/UserDecorator';
import { IUser } from './../common/type/types';

@ApiTags("Blog")
@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}
    @ApiOperation({
        summary: "Get all notes.",
        description: "Get all the data of all notes.",
    })
    @Get("note")
    async note(): Promise<Note[]>
    {
        return await this.blogService.getNote();
    }

    @ApiOperation({
        summary: "Create a note."
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post("note/create")
    async createNote(
        @Body() params: NoteCreateDto,
        @User() user: IUser,
    ): Promise<Note> 
    {
        return await this.blogService.createNote({
            user: user,
            ...params,
        });
    }

    @ApiOperation({
        summary: "Edit a note."
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put("note/edit")
    async editNote(
        @Body() params: NoteEditDto,
        @User() user: IUser,
    ): Promise<Note> 
    {
        return await this.blogService.editNote({
            user: user,
            ...params,
        });
    }

    @ApiOperation({
        summary: "Delete a note.",
        description: "You must specify the id of the note being deleted.",
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete("note/delete")
    async deleteNote(
        @Body() params: NoteDeleteDto,
        @User() user: IUser,
    ): Promise<Note> 
    {
        return await this.blogService.deleteNote({
            user: user,
            ...params,
        });
    }
}
