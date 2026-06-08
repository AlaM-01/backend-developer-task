import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from 'src/modules/products/products.repository';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductDTO } from './dto/product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductsRepository) {}

  /**
   * Create product + business rule validation
   */
  async create(dto: CreateProductDTO): Promise<ProductDTO> {
    // Defensive rule (even though DTO already enforces it)
    if (dto.stockCount < 1) {
      throw new BadRequestException('stockCount must be at least 1');
    }

    return this.repository.create(dto);
  }

  /**
   * Get all products + case insensitive search
   */
  async findAll(search?: string): Promise<ProductDTO[]> {
    return this.repository.findAll(search);
  }

  /**
   * Get single product
   */
  async findOne(id: string): Promise<ProductDTO> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  /**
   * Update product
   */
  async update(id: string, dto: UpdateProductDTO): Promise<ProductDTO> {
    await this.findOne(id);

    // defensive rule again (update path)
    if (dto.stockCount !== undefined && dto.stockCount < 1) {
      throw new BadRequestException('stockCount must be at least 1');
    }

    return this.repository.update(id, dto);
  }

  /**
   * Delete product
   */
  async delete(id: string): Promise<void> {
    await this.findOne(id);
    return this.repository.delete(id);
  }

 /**
   * generic filter?
   */

  async findWithFilter(filter: Partial<ProductDTO>): Promise<ProductDTO[]> {
    return this.repository.findWithFilter(filter);
  }
}