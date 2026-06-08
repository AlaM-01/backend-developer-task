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
   * Creates new member
   * Enforces family member business rules when centralMemberId is provided
   *
   * @param {CreateMemberDTO} member 
   * @returns {Promise<MemberDTO>} 
   * @throws {BadRequestException} 
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
   * @param {number} page 
   * @param {number} limit 
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
   * @param {string} id 
   * @returns {Promise<MemberDTO>} 
   * @throws {NotFoundException} 
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
   * Enforces family member business rules when centralMemberId is provided
   *
   * @param {string} id 
   * @param {UpdateMemberDTO} member 
   * @returns {Promise<MemberDTO>}
   * @throws {NotFoundException} 
   * @throws {BadRequestException} 
   */
  async update(id: string, member: UpdateMemberDTO): Promise<MemberDTO> {
    await this.findOne(id);

    if (member.centralMemberId) {
      await this.validateFamilyMemberRules(id, member.centralMemberId);
    }

    return this.repository.update(id, member as any);
  }

  /**
   * Deletes a member by ID
   *
   * @param {string} id
   * @returns {Promise<void>}
   * @throws {NotFoundException} 
   */
  async delete(id: string): Promise<void> {
    await this.findOne(id);
    return this.repository.delete(id);
  }

  /**
   * Links an existing member as a family member of a central member.
   * Enforces all family member business rules.
   *
   * @param {string} centralMemberId 
   * @param {string} memberId
   * @returns {Promise<MemberDTO>} 
   * @throws {BadRequestException} 
   * @throws {NotFoundException} 
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
   * @param {string} centralMemberId 
   * @param {string} memberId 
   * @returns {Promise<void>}
   * @throws {NotFoundException} 
   * @throws {BadRequestException} 
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
   * - A member cannot be their own central member
   * - central member cannot itself be a family member 
   *
   * @param {string | null} memberId 
   * @param {string} centralMemberId 
   * @throws {BadRequestException}
   * @throws {NotFoundException} 
   */
  private async validateFamilyMemberRules(
    memberId: string | null,
    centralMemberId: string,
  ): Promise<void> {
    // Rule 1: a member cant be their own central member
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

    // Rule 2: the central member cant itself be a family member
    if ((centralMember as any).centralMemberId) {
      throw new BadRequestException(
        'A family member cannot be a central member',
      );
    }
  }
}
