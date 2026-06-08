// import { BadRequestException, NotFoundException } from '@nestjs/common';
// import { ProductsService } from './products.service';

// const mockRepository = () => ({
//   create: jest.fn(),
//   findAll: jest.fn(),
//   findById: jest.fn(),
//   update: jest.fn(),
//   delete: jest.fn(),
//   findWithFilter: jest.fn(),
// });

// const mockProduct = {
//   id: 'uuid-1',
//   name: 'Apple Juice',
//   description: 'Fresh juice',
//   price: 10.99,
//   stockCount: 5,
//   shopId: 'shop-uuid-1',
// };

// describe('ProductsService', () => {
//   let service: ProductsService;
//   let repository: ReturnType<typeof mockRepository>;

//   beforeEach(() => {
//     repository = mockRepository();
//     service = new ProductsService(repository as any);
//   });

//   // ─── create ───────────────────────────────────────────────────────────────

//   describe('create', () => {
//     it('should create and return a product', async () => {
//       repository.create.mockResolvedValue(mockProduct);

//       const result = await service.create({
//         name: 'Apple Juice',
//         price: 10.99,
//         stockCount: 5,
//         shopId: 'shop-uuid-1',
//       } as any);

//       expect(repository.create).toHaveBeenCalledTimes(1);
//       expect(result).toEqual(mockProduct);
//     });

//     it('should throw BadRequestException when stockCount is less than 1', async () => {
//       await expect(
//         service.create({
//           name: 'Apple Juice',
//           price: 10.99,
//           stockCount: 0,
//           shopId: 'shop-uuid-1',
//         } as any),
//       ).rejects.toThrow(BadRequestException);

//       expect(repository.create).not.toHaveBeenCalled();
//     });
//   });

//   // ─── findAll ──────────────────────────────────────────────────────────────

//   describe('findAll', () => {
//     it('should return all products', async () => {
//       repository.findAll.mockResolvedValue([mockProduct]);

//       const result = await service.findAll();

//       expect(repository.findAll).toHaveBeenCalledWith(undefined);
//       expect(result).toEqual([mockProduct]);
//     });

//     it('should pass search term to repository', async () => {
//       repository.findAll.mockResolvedValue([mockProduct]);

//       await service.findAll('apple');

//       expect(repository.findAll).toHaveBeenCalledWith('apple');
//     });
//   });

//   // ─── findOne ──────────────────────────────────────────────────────────────

//   describe('findOne', () => {
//     it('should return a product when found', async () => {
//       repository.findById.mockResolvedValue(mockProduct);

//       const result = await service.findOne('uuid-1');

//       expect(result).toEqual(mockProduct);
//     });

//     it('should throw NotFoundException when product does not exist', async () => {
//       repository.findById.mockResolvedValue(null);

//       await expect(service.findOne('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );
//     });
//   });

//   // ─── update ───────────────────────────────────────────────────────────────

//   describe('update', () => {
//     it('should update and return the product', async () => {
//       const updated = { ...mockProduct, name: 'Pineapple Juice' };
//       repository.findById.mockResolvedValue(mockProduct);
//       repository.update.mockResolvedValue(updated);

//       const result = await service.update('uuid-1', { name: 'Pineapple Juice' });

//       expect(result).toEqual(updated);
//     });

//     it('should throw NotFoundException when product does not exist', async () => {
//       repository.findById.mockResolvedValue(null);

//       await expect(
//         service.update('non-existent-id', { name: 'Pineapple Juice' }),
//       ).rejects.toThrow(NotFoundException);
//     });

//     it('should throw BadRequestException when stockCount is less than 1', async () => {
//       repository.findById.mockResolvedValue(mockProduct);

//       await expect(
//         service.update('uuid-1', { stockCount: 0 }),
//       ).rejects.toThrow(BadRequestException);

//       expect(repository.update).not.toHaveBeenCalled();
//     });
//   });

//   // ─── delete ───────────────────────────────────────────────────────────────

//   describe('delete', () => {
//     it('should delete the product', async () => {
//       repository.findById.mockResolvedValue(mockProduct);
//       repository.delete.mockResolvedValue(undefined);

//       await service.delete('uuid-1');

//       expect(repository.delete).toHaveBeenCalledWith('uuid-1');
//     });

//     it('should throw NotFoundException when product does not exist', async () => {
//       repository.findById.mockResolvedValue(null);

//       await expect(service.delete('non-existent-id')).rejects.toThrow(
//         NotFoundException,
//       );

//       expect(repository.delete).not.toHaveBeenCalled();
//     });
//   });
// });