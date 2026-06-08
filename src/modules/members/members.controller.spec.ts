// import { BadRequestException, NotFoundException } from '@nestjs/common';
// import { MembersController } from './members.controller';

// const mockService = () => ({
//   create: jest.fn(),
//   findAll: jest.fn(),
//   findOne: jest.fn(),
//   update: jest.fn(),
//   delete: jest.fn(),
//   addFamilyMember: jest.fn(),
//   removeFamilyMember: jest.fn(),
// });

// const mockMember = {
//   id: 'uuid-1',
//   firstName: 'John',
//   lastName: 'Doe',
//   gender: 'male',
//   dateOfBirth: '1990-01-01',
//   phone: '01012345678',
//   centralMemberId: null,
// };

// describe('MembersController', () => {
//   let controller: MembersController;
//   let service: ReturnType<typeof mockService>;

//   beforeEach(() => {
//     service = mockService();
//     controller = new MembersController(service as any);
//   });

//   // ─── create ───────────────────────────────────────────────────────────────

//   describe('create', () => {
//     it('should create and return a member', async () => {
//       service.create.mockResolvedValue(mockMember);

//       const result = await controller.create({
//         firstName: 'John',
//         lastName: 'Doe',
//         gender: 'male',
//         dateOfBirth: '1990-01-01',
//       } as any);

//       expect(service.create).toHaveBeenCalledTimes(1);
//       expect(result).toEqual(mockMember);
//     });
//   });

//   // ─── findAll ──────────────────────────────────────────────────────────────

//   describe('findAll', () => {
//     it('should return paginated members', async () => {
//       const paginated = { data: [mockMember], total: 1, page: 1, limit: 20 };
//       service.findAll.mockResolvedValue(paginated);

//       const result = await controller.findAll(1, 20);

//       expect(service.findAll).toHaveBeenCalledWith(1, 20);
//       expect(result).toEqual(paginated);
//     });
//   });

//   // ─── findOne ──────────────────────────────────────────────────────────────

//   describe('findOne', () => {
//     it('should return a member when found', async () => {
//       service.findOne.mockResolvedValue(mockMember);

//       const result = await controller.findOne('uuid-1');

//       expect(result).toEqual(mockMember);
//     });

//     it('should throw NotFoundException when member does not exist', async () => {
//       service.findOne.mockRejectedValue(new NotFoundException());

//       await expect(controller.findOne('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   // ─── update ───────────────────────────────────────────────────────────────

//   describe('update', () => {
//     it('should update and return the member', async () => {
//       const updated = { ...mockMember, firstName: 'Johnny' };
//       service.update.mockResolvedValue(updated);

//       const result = await controller.update('uuid-1', { firstName: 'Johnny' } as any);

//       expect(result).toEqual(updated);
//     });

//     it('should throw NotFoundException when member does not exist', async () => {
//       service.update.mockRejectedValue(new NotFoundException());

//       await expect(
//         controller.update('non-existent-id', { firstName: 'Johnny' } as any),
//       ).rejects.toThrow(NotFoundException);
//     });
//   });

//   // ─── delete ───────────────────────────────────────────────────────────────

//   describe('delete', () => {
//     it('should delete the member', async () => {
//       service.delete.mockResolvedValue(undefined);

//       await controller.delete('uuid-1');

//       expect(service.delete).toHaveBeenCalledWith('uuid-1');
//     });

//     it('should throw NotFoundException when member does not exist', async () => {
//       service.delete.mockRejectedValue(new NotFoundException());

//       await expect(controller.delete('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   // ─── addFamilyMember ──────────────────────────────────────────────────────

//   describe('addFamilyMember', () => {
//     it('should link a family member successfully', async () => {
//       service.addFamilyMember.mockResolvedValue({
//         ...mockMember,
//         centralMemberId: 'uuid-2',
//       });

//       const result = await controller.addFamilyMember('uuid-2', 'uuid-1');

//       expect(service.addFamilyMember).toHaveBeenCalledWith('uuid-2', 'uuid-1');
//       expect(result).toHaveProperty('centralMemberId', 'uuid-2');
//     });

//     it('should throw BadRequestException when member is their own central member', async () => {
//       service.addFamilyMember.mockRejectedValue(new BadRequestException());

//       await expect(
//         controller.addFamilyMember('uuid-1', 'uuid-1'),
//       ).rejects.toThrow(BadRequestException);
//     });
//   });

//   // ─── removeFamilyMember ───────────────────────────────────────────────────

//   describe('removeFamilyMember', () => {
//     it('should unlink a family member successfully', async () => {
//       service.removeFamilyMember.mockResolvedValue(undefined);

//       await controller.removeFamilyMember('uuid-2', 'uuid-1');

//       expect(service.removeFamilyMember).toHaveBeenCalledWith('uuid-2', 'uuid-1');
//     });

//     it('should throw NotFoundException when member does not exist', async () => {
//       service.removeFamilyMember.mockRejectedValue(new NotFoundException());

//       await expect(
//         controller.removeFamilyMember('uuid-2', 'non-existent-id'),
//       ).rejects.toThrow(NotFoundException);
//     });
//   });
// });