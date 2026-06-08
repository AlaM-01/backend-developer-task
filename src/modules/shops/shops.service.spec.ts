// import { NotFoundException } from '@nestjs/common';
// import { ShopsService } from './shops.service';

// const mockRepository = () => ({
//   create: jest.fn(),
//   findAll: jest.fn(),
//   findAllWithProducts: jest.fn(),
//   findOne: jest.fn(),
//   update: jest.fn(),
//   delete: jest.fn(),
// });

// const mockShop = {
//   id: 'uuid-1',
//   name: 'Test Shop',
//   openingHour: new Date('2024-01-01T09:00:00'),
//   closingHour: new Date('2024-01-01T21:00:00'),
//   availability: 'open',
//   toJSON: () => ({
//     id: 'uuid-1',
//     name: 'Test Shop',
//     openingHour: new Date('2024-01-01T09:00:00'),
//     closingHour: new Date('2024-01-01T21:00:00'),
//     availability: 'open',
//     products: [],
//   }),
// };

// describe('ShopsService', () => {
//   let service: ShopsService;
//   let repository: ReturnType<typeof mockRepository>;

//   beforeEach(() => {
//     repository = mockRepository();
//     service = new ShopsService(repository as any);
//   });

//   // ─── create ───────────────────────────────────────────────────────────────

//   describe('create', () => {
//     it('should create and return a shop', async () => {
//       repository.create.mockResolvedValue(mockShop);

//       const result = await service.create({
//         name: 'Test Shop',
//         openingHour: new Date('2024-01-01T09:00:00'),
//         closingHour: new Date('2024-01-01T21:00:00'),
//         availability: 'open',
//       } as any);

//       expect(repository.create).toHaveBeenCalledTimes(1);
//       expect(result).toEqual(mockShop);
//     });
//   });

//   // ─── findAll ──────────────────────────────────────────────────────────────

//   describe('findAll', () => {
//     it('should return paginated shops', async () => {
//       repository.findAll.mockResolvedValue([mockShop]);

//       const result = await service.findAll(20, 0);

//       expect(repository.findAll).toHaveBeenCalledWith(20, 0);
//       expect(result).toEqual([mockShop]);
//     });
//   });

//   // ─── findAllWithProducts ──────────────────────────────────────────────────

//   describe('findAllWithProducts', () => {
//     it('should return shops with products', async () => {
//       repository.findAllWithProducts.mockResolvedValue([
//         { ...mockShop, products: [] },
//       ]);

//       const result = await service.findAllWithProducts(20, 0);

//       expect(result[0]).toHaveProperty('products');
//     });
//   });

//   // ─── findOne ──────────────────────────────────────────────────────────────

//   describe('findOne', () => {
//     it('should return a shop when found', async () => {
//       repository.findOne.mockResolvedValue(mockShop);

//       const result = await service.findOne('uuid-1');

//       expect(result).toEqual(mockShop);
//     });

//     it('should throw NotFoundException when shop does not exist', async () => {
//       repository.findOne.mockResolvedValue(null);

//       await expect(service.findOne('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   // ─── update ───────────────────────────────────────────────────────────────

//   describe('update', () => {
//     it('should update and return the shop', async () => {
//       const updated = { ...mockShop, name: 'Updated Shop' };
//       repository.findOne.mockResolvedValue(mockShop);
//       repository.update.mockResolvedValue(updated);

//       const result = await service.update('uuid-1', { name: 'Updated Shop' } as any);

//       expect(result).toEqual(updated);
//     });

//     it('should throw NotFoundException when shop does not exist', async () => {
//       repository.findOne.mockResolvedValue(null);

//       await expect(
//         service.update('non-existent-id', { name: 'Updated Shop' } as any),
//       ).rejects.toThrow(NotFoundException);
//     });
//   });

//   // ─── delete ───────────────────────────────────────────────────────────────

//   describe('delete', () => {
//     it('should delete the shop', async () => {
//       repository.findOne.mockResolvedValue(mockShop);
//       repository.delete.mockResolvedValue(undefined);

//       await service.delete('uuid-1');

//       expect(repository.delete).toHaveBeenCalledWith('uuid-1');
//     });

//     it('should throw NotFoundException when shop does not exist', async () => {
//       repository.findOne.mockResolvedValue(null);

//       await expect(service.delete('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );

//       expect(repository.delete).not.toHaveBeenCalled();
//     });
//   });
// });