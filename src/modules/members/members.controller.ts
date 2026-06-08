import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { CreateMemberDTO } from './dto/create-member.dto';
import { MemberDTO } from './dto/member.dto';
import { UpdateMemberDTO } from './dto/update-member.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(JoiPipe) createMemberDto: CreateMemberDTO): Promise<MemberDTO> {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.membersService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<MemberDTO> {
    return this.membersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(JoiPipe) updateMemberDto: UpdateMemberDTO,
  ): Promise<MemberDTO> {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.membersService.delete(id);
  }

  /**
   * POST /members/:id/family-members
   * Links an existing member as a family member of the given central member.
   */
  @Post(':id/family-members')
  @HttpCode(HttpStatus.CREATED)
  async addFamilyMember(
    @Param('id', new ParseUUIDPipe()) centralMemberId: string,
    @Body('memberId', new ParseUUIDPipe()) memberId: string,
  ): Promise<MemberDTO> {
    return this.membersService.addFamilyMember(centralMemberId, memberId);
  }

  /**
   * DELETE ^^
   */
  @Delete(':id/family-members/:memberId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFamilyMember(
    @Param('id', new ParseUUIDPipe()) centralMemberId: string,
    @Param('memberId', new ParseUUIDPipe()) memberId: string,
  ): Promise<void> {
    return this.membersService.removeFamilyMember(centralMemberId, memberId);
  }
}
