// import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
// import { Product } from '../products/products.model';

// @Table({ tableName: 'shops' })
// export class Shop extends Model<Shop> {
//   @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
//   id: string;

//   @Column
//   name: string;

//   @Column
//   openingHour: string;

//   @Column
//   closingHour: string;

//   @Column
//   availability: string;

//   @HasMany(() => Product)
//   products: Product[];
// }


//first code of mine 

// import {
//   Column,
//   DataType,
//   Model,
//   PrimaryKey,
//   Table,
// } from 'sequelize-typescript';

// @Table({ tableName: 'shops' })
// export class Shop extends Model<Shop> {
//   @PrimaryKey
//   @Column({
//     type: DataType.UUID,
//     defaultValue: DataType.UUIDV4,
//   })
//   id: string;

//   @Column({ type: DataType.STRING(255), allowNull: false })
//   name: string;

//   @Column({ type: DataType.DATE, allowNull: false })
//   openingHour: Date;

//   @Column({ type: DataType.DATE, allowNull: false })
//   closingHour: Date;

//   @Column({ type: DataType.STRING(32), allowNull: false })
//   availability: string;
// }

//hakuna latest

// import {
//   Column,
//   DataType,
//   HasMany,
//   Model,
//   PrimaryKey,
//   Table,
// } from 'sequelize-typescript';
// import { Product } from 'src/modules/products/products.model';

// @Table({ tableName: 'shops' })
// export class Shop extends Model<Shop> {
//   @PrimaryKey
//   @Column({
//     type: DataType.UUID,
//     defaultValue: DataType.UUIDV4,
//   })
//   id: string;

//   @Column({ type: DataType.STRING(255), allowNull: false })
//   name: string;

//   @Column({ type: DataType.DATE, allowNull: false })
//   openingHour: Date;

//   @Column({ type: DataType.DATE, allowNull: false })
//   closingHour: Date;

//   @Column({ type: DataType.STRING(32), allowNull: false })
//   availability: string;

//   @HasMany(() => Product)
//   products: Product[];
// }


//hakuna 2
// import {
//   Column,
//   DataType,
//   HasMany,
//   Model,
//   PrimaryKey,
//   Table,
// } from 'sequelize-typescript';
// import { Product } from 'src/modules/products/products.model';

// export enum ShopAvailability {
//   BUSY = 'busy',
//   OPEN = 'open',
//   CLOSED = 'closed',
// }

// @Table({ tableName: 'shops' })
// export class Shop extends Model<Shop> {
//   @PrimaryKey
//   @Column({
//     type: DataType.UUID,
//     defaultValue: DataType.UUIDV4,
//   })
//   id: string;

//   @Column({ type: DataType.STRING(255), allowNull: false })
//   name: string;

//   @Column({ type: DataType.TIME, allowNull: false })
//   openingHour: string;

//   @Column({ type: DataType.TIME, allowNull: false })
//   closingHour: string;

//   @Column({
//     type: DataType.ENUM(...Object.values(ShopAvailability)),
//     allowNull: false,
//     defaultValue: ShopAvailability.OPEN,
//   })
//   availability: ShopAvailability;

//   @HasMany(() => Product)
//   products: Product[];
// }

import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/modules/products/products.model';

export enum ShopAvailability {
  BUSY = 'busy',
  OPEN = 'open',
  CLOSED = 'closed',
}

@Table({ tableName: 'shops' })
export class Shop extends Model<Shop> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.DATE, allowNull: false })
  openingHour: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  closingHour: Date;

  @Column({
    type: DataType.ENUM(...Object.values(ShopAvailability)),
    allowNull: false,
    defaultValue: ShopAvailability.OPEN,
  })
  availability: ShopAvailability;

  @HasMany(() => Product)
  products: Product[];
}