import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/modules/products/products.model';
import { Shop } from 'src/modules/shops/shops.model';

@Injectable()
export class ShopsRepository {
  constructor(@InjectModel(Shop) private readonly shopModel: typeof Shop) {}

  async create(shop: Partial<Shop>): Promise<Shop> {
    return this.shopModel.create(shop);
  }

  async findAll(limit = 20, offset = 0): Promise<Shop[]> {
    return this.shopModel.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Fetches shops with their products using separate queries to avoid
   * row duplication that occurs with JOIN when a shop has many products.
   * Also paginated to avoid loading the entire table at once.
   */
  async findAllWithProducts(limit = 20, offset = 0): Promise<Shop[]> {
    return this.shopModel.findAll({
      include: [{ model: Product, separate: true }],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Shop> {
    return this.shopModel.findByPk(id);
  }

  async update(id: string, shop: Partial<Shop>): Promise<Shop> {
    const result = await this.shopModel.update(shop, {
      where: { id },
      returning: true,
    });

    return result[1][0];
  }

  async delete(id: string): Promise<void> {
    await this.shopModel.destroy({ where: { id } });
  }
}
