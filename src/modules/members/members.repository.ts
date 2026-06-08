import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Member } from 'src/modules/members/members.model';

@Injectable()
export class MembersRepository {
  constructor(
    @InjectModel(Member) private readonly memberModel: typeof Member,
  ) {}

  /**
   * Creates a member row in the database.
   *
   * @param {Partial<Member>} member - Member fields to save.
   * @returns {Promise<Member>} The created member row.
   * @throws {Error} If the database insert fails.
   */
  async create(member: Partial<Member>): Promise<Member> {
    return this.memberModel.create(member);
  }

  /**
   * Fetches a paginated list of members.
   *
   * @param {number} limit 
   * @param {number} offset 
   * @returns {Promise<{ rows: Member[]; count: number }>} 
   * @throws {Error} 
   */
  async findAll(limit: number, offset: number): Promise<{ rows: Member[]; count: number }> {
    return this.memberModel.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Fetches a member by ID 
   *
   * @param {string} id 
   * @returns {Promise<Member | null>} 
   * @throws {Error} 
   */
  async findOne(id: string): Promise<Member | null> {
    return this.memberModel.findByPk(id);
  }

  /**
   * Updates member by ID and returns the updated rw
   *
   * @param {string} id 
   * @param {Partial<Member>} member 
   * @returns {Promise<Member>} 
   * @throws {Error} 
   */
  async update(id: string, member: Partial<Member>): Promise<Member> {
    const result = await this.memberModel.update(member, {
      where: { id },
      returning: true,
    });

    return result[1][0];
  }

  /**
   * Deletes member by ID
   *
   * @param {string} id 
   * @returns {Promise<void>} 
   * @throws {Error} 
   */
  async delete(id: string): Promise<void> {
    await this.memberModel.destroy({ where: { id } });
  }

  /**
   * Links a member as a family member of a central member
   * by setting centralMemberId on linked member's rw
   *
   * @param {string} centralMemberId 
   * @param {string} memberId 
   * @returns {Promise<Member>} 
   * @throws {Error} 
   */
  async addFamilyMember(
    centralMemberId: string,
    memberId: string,
  ): Promise<Member> {
    const result = await this.memberModel.update(
      { centralMemberId },
      { where: { id: memberId }, returning: true },
    );

    return result[1][0];
  }

  /**
   * Unlinks family member from central member
   * by clearing centralMemberId on the member's rw
   *
   * @param {string} memberId 
   * @returns {Promise<void>}
   * @throws {Error} 
   */
  async removeFamilyMember(memberId: string): Promise<void> {
    await this.memberModel.update(
      { centralMemberId: null },
      { where: { id: memberId } },
    );
  }
}