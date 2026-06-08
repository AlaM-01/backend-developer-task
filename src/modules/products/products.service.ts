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
   * Create product with business rule validation
   */
  async create(dto: CreateProductDTO): Promise<ProductDTO> {
    // Defensive rule (even though DTO already enforces it)
    if (dto.stockCount < 1) {
      throw new BadRequestException('stockCount must be at least 1');
    }

    return this.repository.create(dto);
  }

  /**
   * Get all products with optional case-insensitive search
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
   * Generic filter (used by shops module likely)
   */
  async findWithFilter(filter: Partial<ProductDTO>): Promise<ProductDTO[]> {
    return this.repository.findWithFilter(filter);
  }
}


// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ProductsRepository } from 'src/modules/products/products.repository';

// @Injectable()
// export class ProductsService {
//   constructor(private readonly repository: ProductsRepository) {}

//   async create(dto: any) {
//     return this.repository.create(dto);
//   }

//   async findAll(search?: string) {
//     return this.repository.findAll(search);
//   }

//   async findOne(id: string) {
//     const product = await this.repository.findById(id);
//     if (!product) throw new NotFoundException('Product not found');
//     return product;
//   }

//   async update(id: string, dto: any) {
//     await this.findOne(id);
//     return this.repository.update(id, dto);
//   }

//   async delete(id: string) {
//     await this.findOne(id);
//     return this.repository.delete(id);
//   }

//   async findWithFilter(filter: any) {
//   return this.repository.findWithFilter(filter);
// }

// }


// import { Injectable } from '@nestjs/common';
// import { ProductsRepository } from 'src/modules/products/products.repository';
// import { ProductDTO } from 'src/modules/products/dto/product.dto';

// @Injectable()
// export class ProductsService {
//   constructor(private readonly repository: ProductsRepository) {}

//   async findWithFilter(filter: Partial<ProductDTO>): Promise<ProductDTO[]> {
//     return this.repository.findWithFilter(filter);
//   }
// }
