// import { NotFoundException } from '@nestjs/common';
// import { ProductsController } from './products.controller';

// const mockService = () => ({
//   create: jest.fn(),
//   findAll: jest.fn(),
//   findOne: jest.fn(),
//   update: jest.fn(),
//   delete: jest.fn(),
// });

// const mockProduct = {
//   id: 'uuid-1',
//   name: 'Apple Juice',
//   description: 'Fresh juice',
//   price: 10.99,
//   stockCount: 5,
//   shopId: 'shop-uuid-1',
// };

// describe('ProductsController', () => {
//   let controller: ProductsController;
//   let service: ReturnType<typeof mockService>;

//   beforeEach(() => {
//     service = mockService();
//     controller = new ProductsController(service as any);
//   });

//   // ─── create ───────────────────────────────────────────────────────────────

//   describe('create', () => {
//     it('should create and return a product', async () => {
//       service.create.mockResolvedValue(mockProduct);

//       const result = await controller.create({
//         name: 'Apple Juice',
//         price: 10.99,
//         stockCount: 5,
//         shopId: 'shop-uuid-1',
//       } as any);

//       expect(service.create).toHaveBeenCalledTimes(1);
//       expect(result).toEqual(mockProduct);
//     });
//   });

//   // ─── findAll ──────────────────────────────────────────────────────────────

//   describe('findAll', () => {
//     it('should return all products', async () => {
//       service.findAll.mockResolvedValue([mockProduct]);

//       const result = await controller.findAll();

//       expect(result).toEqual([mockProduct]);
//     });

//     it('should pass search term to service', async () => {
//       service.findAll.mockResolvedValue([mockProduct]);

//       await controller.findAll('apple');

//       expect(service.findAll).toHaveBeenCalledWith('apple');
//     });
//   });

//   // ─── findOne ──────────────────────────────────────────────────────────────

//   describe('findOne', () => {
//     it('should return a product when found', async () => {
//       service.findOne.mockResolvedValue(mockProduct);

//       const result = await controller.findOne('uuid-1');

//       expect(result).toEqual(mockProduct);
//     });

//     it('should throw NotFoundException when product does not exist', async () => {
//       service.findOne.mockRejectedValue(new NotFoundException());

//       await expect(controller.findOne('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   // ─── update ───────────────────────────────────────────────────────────────

//   describe('update', () => {
//     it('should update and return the product', async () => {
//       const updated = { ...mockProduct, name: 'Pineapple Juice' };
//       service.update.mockResolvedValue(updated);

//       const result = await controller.update('uuid-1', { name: 'Pineapple Juice' });

//       expect(result).toEqual(updated);
//     });

//     it('should throw NotFoundException when product does not exist', async () => {
//       service.update.mockRejectedValue(new NotFoundException());

//       await expect(
//         controller.update('non-existent-id', { name: 'Pineapple Juice' }),
//       ).rejects.toThrow(NotFoundException);
//     });
//   });

//   // ─── delete ───────────────────────────────────────────────────────────────

//   describe('delete', () => {
//     it('should delete the product', async () => {
//       service.delete.mockResolvedValue(undefined);

//       await controller.delete('uuid-1');

//       expect(service.delete).toHaveBeenCalledWith('uuid-1');
//     });

//     it('should throw NotFoundException when product does not exist', async () => {
//       service.delete.mockRejectedValue(new NotFoundException());

//       await expect(controller.delete('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });
// });