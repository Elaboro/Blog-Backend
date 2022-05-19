import { 
    Controller, 
    Get, 
    Post,
    Put,
    Delete,
    Body,
    UseGuards,
    Request,
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
        @Request() request: any
    ): Promise<Note> 
    {
        const user = request.user;
        return await this.blogService.createNote(user, params);
    }

    @ApiOperation({
        summary: "Edit a note."
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put("note/edit")
    async editNote(
        @Body() params: NoteEditDto,
        @Request() request: any
    ): Promise<Note> 
    {
        const user = request.user;
        return await this.blogService.editNote(params, user);
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
        @Request() request: any
    ): Promise<Note> 
    {
        const user = request.user;
        return await this.blogService.deleteNote(params, user);
    }
}
