import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDTO } from 'src/modules/members/dto/create-member.dto';
import { MemberDTO } from 'src/modules/members/dto/member.dto';
import { UpdateMemberDTO } from 'src/modules/members/dto/update-member.dto';
import { MembersRepository } from 'src/modules/members/members.repository';

@Injectable()
export class MembersService {
  constructor(private readonly repository: MembersRepository) {}

  /**
   * Creates a new member.
   * Enforces family member business rules when centralMemberId is provided.
   *
   * @param {CreateMemberDTO} member - The member data to create.
   * @returns {Promise<MemberDTO>} The created member.
   * @throws {BadRequestException} If any family member business rule is violated.
   */
  async create(member: CreateMemberDTO): Promise<MemberDTO> {
    if (member.centralMemberId) {
      await this.validateFamilyMemberRules(null, member.centralMemberId);
    }

    return this.repository.create(member as any);
  }

  /**
   * Returns a paginated list of members.
   *
   * @param {number} page - Page number (1-based).
   * @param {number} limit - Number of records per page.
   * @returns {Promise<{ data: MemberDTO[]; total: number; page: number; limit: number }>}
   */
  async findAll(
    page = 1,
    limit = 20,
  ): Promise<{ data: MemberDTO[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.repository.findAll(limit, offset);

    return {
      data: rows,
      total: count,
      page,
      limit,
    };
  }

  /**
   * Fetches a single member by ID.
   * Throws 404 if not found.
   *
   * @param {string} id - Member ID.
   * @returns {Promise<MemberDTO>} The found member.
   * @throws {NotFoundException} If member does not exist.
   */
  async findOne(id: string): Promise<MemberDTO> {
    const member = await this.repository.findOne(id);

    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }

    return member;
  }

  /**
   * Updates a member by ID.
   * Enforces family member business rules when centralMemberId is provided.
   *
   * @param {string} id - Member ID.
   * @param {UpdateMemberDTO} member - Fields to update.
   * @returns {Promise<MemberDTO>} The updated member.
   * @throws {NotFoundException} If member does not exist.
   * @throws {BadRequestException} If any family member business rule is violated.
   */
  async update(id: string, member: UpdateMemberDTO): Promise<MemberDTO> {
    await this.findOne(id);

    if (member.centralMemberId) {
      await this.validateFamilyMemberRules(id, member.centralMemberId);
    }

    return this.repository.update(id, member as any);
  }

  /**
   * Deletes a member by ID.
   * Throws 404 if not found.
   *
   * @param {string} id - Member ID.
   * @returns {Promise<void>}
   * @throws {NotFoundException} If member does not exist.
   */
  async delete(id: string): Promise<void> {
    await this.findOne(id);
    return this.repository.delete(id);
  }

  /**
   * Links an existing member as a family member of a central member.
   * Enforces all family member business rules.
   *
   * @param {string} centralMemberId - ID of the central member.
   * @param {string} memberId - ID of the member to link.
   * @returns {Promise<MemberDTO>} The updated member.
   * @throws {BadRequestException} If any business rule is violated.
   * @throws {NotFoundException} If either member does not exist.
   */
  async addFamilyMember(
    centralMemberId: string,
    memberId: string,
  ): Promise<MemberDTO> {
    await this.validateFamilyMemberRules(memberId, centralMemberId);
    return this.repository.addFamilyMember(centralMemberId, memberId);
  }

  /**
   * Unlinks a family member from a central member.
   *
   * @param {string} centralMemberId - ID of the central member.
   * @param {string} memberId - ID of the family member to unlink.
   * @returns {Promise<void>}
   * @throws {NotFoundException} If either member does not exist.
   * @throws {BadRequestException} If the member is not linked to this central member.
   */
  async removeFamilyMember(
    centralMemberId: string,
    memberId: string,
  ): Promise<void> {
    const member = await this.repository.findOne(memberId);

    if (!member) {
      throw new NotFoundException(`Member with id ${memberId} not found`);
    }

    if ((member as any).centralMemberId !== centralMemberId) {
      throw new BadRequestException(
        `Member ${memberId} is not a family member of ${centralMemberId}`,
      );
    }

    return this.repository.removeFamilyMember(memberId);
  }

  /**
   * Validates family member business rules:
   * 1. A member cannot be their own central member.
   * 2. A central member cannot itself be a family member (no chaining).
   *
   * @param {string | null} memberId - ID of the member being created/updated (null on create).
   * @param {string} centralMemberId - ID of the proposed central member.
   * @throws {BadRequestException} If any rule is violated.
   * @throws {NotFoundException} If the central member does not exist.
   */
  private async validateFamilyMemberRules(
    memberId: string | null,
    centralMemberId: string,
  ): Promise<void> {
    // Rule 1: a member cannot be their own central member
    if (memberId && memberId === centralMemberId) {
      throw new BadRequestException(
        'A member cannot be their own central member',
      );
    }

    // Verify the central member actually exists
    const centralMember = await this.repository.findOne(centralMemberId);

    if (!centralMember) {
      throw new NotFoundException(
        `Central member with id ${centralMemberId} not found`,
      );
    }

    // Rule 2: the central member cannot itself be a family member (no chaining)
    if ((centralMember as any).centralMemberId) {
      throw new BadRequestException(
        'A family member cannot be a central member',
      );
    }
  }
}

//hakuna 
// import { Injectable } from '@nestjs/common';
// import { CreateMemberDTO } from 'src/modules/members/dto/create-member.dto';
// import { MemberDTO } from 'src/modules/members/dto/member.dto';
// import { UpdateMemberDTO } from 'src/modules/members/dto/update-member.dto';
// import { MembersRepository } from 'src/modules/members/members.repository';

// @Injectable()
// export class MembersService {
//   constructor(private readonly repository: MembersRepository) {}

//   /**
//    * This method creates a new member
//    * @param member - The member to create
//    * @returns The created member
//    */
//   async create(member: CreateMemberDTO): Promise<MemberDTO> {
//     return this.repository.create(member);
//   }

//   /**
//    * This method finds all members
//    * FIXME: A club can have more than 100k members, wow!
//    * Can we find a way to return the members in an efficient way?
//    */
//   async findAll(): Promise<MemberDTO[]> {
//     return this.repository.findAll();
//   }

//   async findOne(id: string): Promise<MemberDTO> {
//     return this.repository.findOne(id);
//   }

//   async update(id: string, member: UpdateMemberDTO): Promise<MemberDTO> {
//     return this.repository.update(id, member);
//   }

//   async delete(id: string): Promise<void> {
//     return this.repository.delete(id);
//   }
// }
