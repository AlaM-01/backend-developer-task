// import { NotFoundException } from '@nestjs/common';
// import { ShopsController } from './shops.controller';

// const mockService = () => ({
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
// };

// describe('ShopsController', () => {
//   let controller: ShopsController;
//   let service: ReturnType<typeof mockService>;

//   beforeEach(() => {
//     service = mockService();
//     controller = new ShopsController(service as any);
//   });

//   // ─── create ───────────────────────────────────────────────────────────────

//   describe('create', () => {
//     it('should create and return a shop', async () => {
//       service.create.mockResolvedValue(mockShop);

//       const result = await controller.create({
//         name: 'Test Shop',
//         openingHour: new Date('2024-01-01T09:00:00'),
//         closingHour: new Date('2024-01-01T21:00:00'),
//         availability: 'open',
//       } as any);

//       expect(service.create).toHaveBeenCalledTimes(1);
//       expect(result).toEqual(mockShop);
//     });
//   });

//   // ─── findAll ──────────────────────────────────────────────────────────────

//   describe('findAll', () => {
//     it('should return paginated shops', async () => {
//       service.findAll.mockResolvedValue([mockShop]);

//       const result = await controller.findAll(20, 0);

//       expect(service.findAll).toHaveBeenCalledWith(20, 0);
//       expect(result).toEqual([mockShop]);
//     });
//   });

//   // ─── findAllWithProducts ──────────────────────────────────────────────────

//   describe('findAllWithProducts', () => {
//     it('should return shops with products', async () => {
//       service.findAllWithProducts.mockResolvedValue([{ ...mockShop, products: [] }]);

//       const result = await controller.findAllWithProducts(20, 0);

//       expect(result[0]).toHaveProperty('products');
//     });
//   });

//   // ─── findOne ──────────────────────────────────────────────────────────────

//   describe('findOne', () => {
//     it('should return a shop when found', async () => {
//       service.findOne.mockResolvedValue(mockShop);

//       const result = await controller.findOne('uuid-1');

//       expect(result).toEqual(mockShop);
//     });

//     it('should throw NotFoundException when shop does not exist', async () => {
//       service.findOne.mockRejectedValue(new NotFoundException());

//       await expect(controller.findOne('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   // ─── update ───────────────────────────────────────────────────────────────

//   describe('update', () => {
//     it('should update and return the shop', async () => {
//       const updated = { ...mockShop, name: 'Updated Shop' };
//       service.update.mockResolvedValue(updated);

//       const result = await controller.update('uuid-1', { name: 'Updated Shop' } as any);

//       expect(result).toEqual(updated);
//     });

//     it('should throw NotFoundException when shop does not exist', async () => {
//       service.update.mockRejectedValue(new NotFoundException());

//       await expect(
//         controller.update('non-existent-id', { name: 'Updated Shop' } as any),
//       ).rejects.toThrow(NotFoundException);
//     });
//   });

//   // ─── delete ───────────────────────────────────────────────────────────────

//   describe('delete', () => {
//     it('should delete the shop', async () => {
//       service.delete.mockResolvedValue(undefined);

//       await controller.delete('uuid-1');

//       expect(service.delete).toHaveBeenCalledWith('uuid-1');
//     });

//     it('should throw NotFoundException when shop does not exist', async () => {
//       service.delete.mockRejectedValue(new NotFoundException());

//       await expect(controller.delete('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });
// });