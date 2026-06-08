// import { BadRequestException, NotFoundException } from '@nestjs/common';
// import { MembersService } from './members.service';

// const mockRepository = () => ({
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

// const mockCentralMember = {
//   id: 'uuid-2',
//   firstName: 'Jane',
//   lastName: 'Doe',
//   gender: 'female',
//   dateOfBirth: '1985-01-01',
//   centralMemberId: null,
// };

// describe('MembersService', () => {
//   let service: MembersService;
//   let repository: ReturnType<typeof mockRepository>;

//   beforeEach(() => {
//     repository = mockRepository();
//     service = new MembersService(repository as any);
//   });

//   // ─── create ───────────────────────────────────────────────────────────────

//   describe('create', () => {
//     it('should create and return a member', async () => {
//       repository.create.mockResolvedValue(mockMember);

//       const result = await service.create({
//         firstName: 'John',
//         lastName: 'Doe',
//         gender: 'male',
//         dateOfBirth: '1990-01-01',
//       } as any);

//       expect(repository.create).toHaveBeenCalledTimes(1);
//       expect(result).toEqual(mockMember);
//     });

//     it('should throw NotFoundException when centralMemberId does not exist', async () => {
//       repository.findOne.mockResolvedValue(null);

//       await expect(
//         service.create({
//           firstName: 'John',
//           lastName: 'Doe',
//           gender: 'male',
//           dateOfBirth: '1990-01-01',
//           centralMemberId: 'non-existent-id',
//         } as any),
//       ).rejects.toThrow(NotFoundException);

//       expect(repository.create).not.toHaveBeenCalled();
//     });
//   });

//   // ─── findAll ──────────────────────────────────────────────────────────────

//   describe('findAll', () => {
//     it('should return paginated members', async () => {
//       repository.findAll.mockResolvedValue({ rows: [mockMember], count: 1 });

//       const result = await service.findAll(1, 20);

//       expect(result).toEqual({
//         data: [mockMember],
//         total: 1,
//         page: 1,
//         limit: 20,
//       });
//     });
//   });

//   // ─── findOne ──────────────────────────────────────────────────────────────

//   describe('findOne', () => {
//     it('should return a member when found', async () => {
//       repository.findOne.mockResolvedValue(mockMember);

//       const result = await service.findOne('uuid-1');

//       expect(result).toEqual(mockMember);
//     });

//     it('should throw NotFoundException when member does not exist', async () => {
//       repository.findOne.mockResolvedValue(null);

//       await expect(service.findOne('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   // ─── update ───────────────────────────────────────────────────────────────

//   describe('update', () => {
//     it('should update and return the member', async () => {
//       const updated = { ...mockMember, firstName: 'Johnny' };
//       repository.findOne.mockResolvedValue(mockMember);
//       repository.update.mockResolvedValue(updated);

//       const result = await service.update('uuid-1', { firstName: 'Johnny' } as any);

//       expect(result).toEqual(updated);
//     });

//     it('should throw NotFoundException when member does not exist', async () => {
//       repository.findOne.mockResolvedValue(null);

//       await expect(
//         service.update('non-existent-id', { firstName: 'Johnny' } as any),
//       ).rejects.toThrow(NotFoundException);
//     });
//   });

//   // ─── delete ───────────────────────────────────────────────────────────────

//   describe('delete', () => {
//     it('should delete the member', async () => {
//       repository.findOne.mockResolvedValue(mockMember);
//       repository.delete.mockResolvedValue(undefined);

//       await service.delete('uuid-1');

//       expect(repository.delete).toHaveBeenCalledWith('uuid-1');
//     });

//     it('should throw NotFoundException when member does not exist', async () => {
//       repository.findOne.mockResolvedValue(null);

//       await expect(service.delete('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );

//       expect(repository.delete).not.toHaveBeenCalled();
//     });
//   });

//   // ─── addFamilyMember ──────────────────────────────────────────────────────

//   describe('addFamilyMember', () => {
//     it('should link a family member successfully', async () => {
//       repository.findOne.mockResolvedValue(mockCentralMember);
//       repository.addFamilyMember.mockResolvedValue({
//         ...mockMember,
//         centralMemberId: 'uuid-2',
//       });

//       const result = await service.addFamilyMember('uuid-2', 'uuid-1');

//       expect(repository.addFamilyMember).toHaveBeenCalledWith('uuid-2', 'uuid-1');
//       expect(result).toHaveProperty('centralMemberId', 'uuid-2');
//     });

//     it('should throw BadRequestException when member is their own central member', async () => {
//       await expect(
//         service.addFamilyMember('uuid-1', 'uuid-1'),
//       ).rejects.toThrow(BadRequestException);
//     });

//     it('should throw BadRequestException when central member is itself a family member', async () => {
//       repository.findOne.mockResolvedValue({
//         ...mockCentralMember,
//         centralMemberId: 'uuid-3',
//       });

//       await expect(
//         service.addFamilyMember('uuid-2', 'uuid-1'),
//       ).rejects.toThrow(BadRequestException);
//     });

//     it('should throw NotFoundException when central member does not exist', async () => {
//       repository.findOne.mockResolvedValue(null);

//       await expect(
//         service.addFamilyMember('non-existent-id', 'uuid-1'),
//       ).rejects.toThrow(NotFoundException);
//     });
//   });

//   // ─── removeFamilyMember ───────────────────────────────────────────────────

//   describe('removeFamilyMember', () => {
//     it('should unlink a family member successfully', async () => {
//       repository.findOne.mockResolvedValue({
//         ...mockMember,
//         centralMemberId: 'uuid-2',
//       });
//       repository.removeFamilyMember.mockResolvedValue(undefined);

//       await service.removeFamilyMember('uuid-2', 'uuid-1');

//       expect(repository.removeFamilyMember).toHaveBeenCalledWith('uuid-1');
//     });

//     it('should throw NotFoundException when member does not exist', async () => {
//       repository.findOne.mockResolvedValue(null);

//       await expect(
//         service.removeFamilyMember('uuid-2', 'non-existent-id'),
//       ).rejects.toThrow(NotFoundException);
//     });

//     it('should throw BadRequestException when member is not linked to central member', async () => {
//       repository.findOne.mockResolvedValue({
//         ...mockMember,
//         centralMemberId: 'uuid-99',
//       });

//       await expect(
//         service.removeFamilyMember('uuid-2', 'uuid-1'),
//       ).rejects.toThrow(BadRequestException);
//     });
//   });
// });