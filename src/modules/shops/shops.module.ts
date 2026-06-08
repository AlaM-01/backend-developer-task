
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

//hakuna
// import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';

// import { Product } from 'src/modules/products/products.model';
// import { Shop } from 'src/modules/shops/shops.model';

// import { ShopsController } from 'src/modules/shops/shops.controller';
// import { ShopsRepository } from 'src/modules/shops/shops.repository';
// import { ShopsService } from 'src/modules/shops/shops.service';

// // @Module({
// //   imports: [
// //     SequelizeModule.forFeature([Shop, Product]),
// //   ],
// //   controllers: [ShopsController],
// //   providers: [ShopsService, ShopsRepository],
// //   exports: [ShopsService, ShopsRepository],
// // })
// // export class ShopsModule {}
// @Module({
//   imports: [SequelizeModule.forFeature([Shop, Product])],
//   controllers: [ShopsController],
//   providers: [ShopsService, ShopsRepository],
// })
// export class ShopsModule {}

// import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { Shop } from 'src/modules/shops/shops.model';
// import { ShopsController } from 'src/modules/shops/shops.controller';
// import { ShopsService } from 'src/modules/shops/shops.service';
// import { ShopsRepository } from 'src/modules/shops/shops.repository';
// import { ProductsModule } from 'src/modules/products/products.module';

// @Module({
//   imports: [SequelizeModule.forFeature([Shop]), ProductsModule],
//   controllers: [ShopsController],
//   providers: [ShopsService, ShopsRepository],
//   exports: [ShopsService, ShopsRepository],
// })
// export class ShopsModule {}
