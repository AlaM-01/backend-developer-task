

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Product } from 'src/modules/products/products.model';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    return this.productModel.create(data);
  }

  async findAll(search?: string): Promise<Product[]> {
    return this.productModel.findAll({
      where: search
        ? {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          }
        : {},
    });
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findByPk(id);
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const result = await this.productModel.update(data, {
      where: { id },
      returning: true,
    });

    return result[1][0];
  }

  async delete(id: string): Promise<void> {
    await this.productModel.destroy({ where: { id } });
  }

  async findWithFilter(filters: any): Promise<Product[]> {
  return this.productModel.findAll({
    where: filters,
  });
}
}
