
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/modules/products/products.model';
import { ShopsController } from 'src/modules/shops/shops.controller';
import { Shop } from 'src/modules/shops/shops.model';
import { ShopsRepository } from 'src/modules/shops/shops.repository';
import { ShopsService } from 'src/modules/shops/shops.service';

@Module({
  imports: [SequelizeModule.forFeature([Shop, Product])],
  controllers: [ShopsController],
  providers: [ShopsService, ShopsRepository],
  exports: [ShopsService, ShopsRepository],
})
export class ShopsModule {}
