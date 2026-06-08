import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopDTO } from 'src/modules/shops/dto/create-shop.dto';
import { ShopWithProductsDTO } from 'src/modules/shops/dto/shop-with-products.dto';
import { ShopDTO } from 'src/modules/shops/dto/shop.dto';
import { UpdateShopDTO } from 'src/modules/shops/dto/update-shop.dto';
import { ShopsRepository } from 'src/modules/shops/shops.repository';

@Injectable()
export class ShopsService {
  constructor(private readonly repository: ShopsRepository) {}

  async create(shop: CreateShopDTO): Promise<ShopDTO> {
    return this.repository.create(shop as any);
  }

  async findAll(limit?: number, offset?: number): Promise<ShopDTO[]> {
    return this.repository.findAll(limit, offset);
  }

  /**
   * Fetches all shops w/ their products.
   * Uses separate:true in the repository to avoid JOIN row duplication.
   * Paginated to prevent loading the full dataset into memory.
   */
  async findAllWithProducts(
    limit?: number,
    offset?: number,
  ): Promise<ShopWithProductsDTO[]> {
    const shops = await this.repository.findAllWithProducts(limit, offset);

    return shops.map((shop: any) => ({
      ...shop.toJSON(),
      products: shop.products ?? [],
    }));
  }

  async findOne(id: string): Promise<ShopDTO> {
    const shop = await this.repository.findOne(id);

    if (!shop) {
      throw new NotFoundException(`Shop with id ${id} not found`);
    }

    return shop;
  }

  async update(id: string, shop: UpdateShopDTO): Promise<ShopDTO> {
    await this.findOne(id);
    return this.repository.update(id, shop as any);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    return this.repository.delete(id);
  }
}

