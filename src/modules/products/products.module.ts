import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from './products.controller';
import { Product } from './products.model';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService], // ✅ ADD THIS
})
export class ProductsModule {}

// import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { Product } from 'src/modules/products/products.model';
// import { ProductsController } from 'src/modules/products/products.controller';
// import { ProductsService } from 'src/modules/products/products.service';
// import { ProductsRepository } from 'src/modules/products/products.repository';

// @Module({
//   imports: [SequelizeModule.forFeature([Product])],
//   controllers: [ProductsController],
//   providers: [ProductsService, ProductsRepository],
//   exports: [ProductsService, ProductsRepository],
// })
// export class ProductsModule {}
