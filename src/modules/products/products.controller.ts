import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';

import { CreateProductDTO } from './dto/create-product.dto';
import { ProductDTO } from './dto/product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  /**
   * Create product
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(JoiPipe) dto: CreateProductDTO): Promise<ProductDTO> {
    return this.service.create(dto);
  }

  /**
   * Get all products (with optional case-insensitive search)
   */
  @Get()
  async findAll(@Query('search') search?: string): Promise<ProductDTO[]> {
    return this.service.findAll(search);
  }

  /**
   * Get single product
   */
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ProductDTO> {
    return this.service.findOne(id);
  }

  /**
   * Update product
   */
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(JoiPipe) dto: UpdateProductDTO,
  ): Promise<ProductDTO> {
    return this.service.update(id, dto);
  }

  /**
   * Delete product
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.service.delete(id);
  }
}

// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   ParseUUIDPipe,
//   Patch,
//   Post,
//   Query,
// } from '@nestjs/common';

// import { CreateProductDTO } from './dto/create-product.dto';
// import { ProductDTO } from './dto/product.dto';
// import { UpdateProductDTO } from './dto/update-product.dto';
// import { ProductsService } from './products.service';

// @Controller('products')
// export class ProductsController {
//   constructor(private readonly service: ProductsService) {}

//   /**
//    * Create product
//    */
//   @Post()
//   async create(@Body() dto: CreateProductDTO): Promise<ProductDTO> {
//     return this.service.create(dto);
//   }

//   /**
//    * Get all products (with optional search)
//    */
//   @Get()
//   async findAll(@Query('search') search?: string): Promise<ProductDTO[]> {
//     return this.service.findAll(search);
//   }

//   /**
//    * Get single product
//    */
//   @Get(':id')
//   async findOne(
//     @Param('id', new ParseUUIDPipe()) id: string,
//   ): Promise<ProductDTO> {
//     return this.service.findOne(id);
//   }

//   /**
//    * Update product
//    */
//   @Patch(':id')
//   async update(
//     @Param('id', new ParseUUIDPipe()) id: string,
//     @Body() dto: UpdateProductDTO,
//   ): Promise<ProductDTO> {
//     return this.service.update(id, dto);
//   }

//   /**
//    * Delete product
//    */
//   @Delete(':id')
//   async delete(
//     @Param('id', new ParseUUIDPipe()) id: string,
//   ): Promise<void> {
//     return this.service.delete(id);
//   }
// }

// import {
//     Body,
//     Controller,
//     Delete,
//     Get,
//     Param,
//     Patch,
//     Post,
//     Query,
// } from '@nestjs/common';

// import { CreateProductDTO } from './dto/create-product.dto';
// import { ProductDTO } from './dto/product.dto';
// import { UpdateProductDTO } from './dto/update-product.dto';
// import { ProductsService } from './products.service';

// @Controller('products')
// export class ProductsController {
//   constructor(private readonly service: ProductsService) {}

//   /**
//    * Create product
//    */
//   @Post()
//   async create(@Body() dto: CreateProductDTO): Promise<ProductDTO> {
//     return this.service.create(dto);
//   }

//   /**
//    * Get all products (with optional case-insensitive search)
//    * GET /products?search=app
//    */
//   @Get()
//   async findAll(@Query('search') search?: string): Promise<ProductDTO[]> {
//     return this.service.findAll(search);
//   }

//   /**
//    * Get single product by id
//    */
//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<ProductDTO> {
//     return this.service.findOne(id);
//   }

//   /**
//    * Update product
//    */
//   @Patch(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() dto: UpdateProductDTO,
//   ): Promise<ProductDTO> {
//     return this.service.update(id, dto);
//   }

//   /**
//    * Delete product
//    */
//   @Delete(':id')
//   async delete(@Param('id') id: string): Promise<void> {
//     return this.service.delete(id);
//   }
// }

// import {
//     Body,
//     Controller,
//     Delete,
//     Get,
//     Param,
//     Patch,
//     Post,
//     Query,
// } from '@nestjs/common';
// import { ProductsService } from './products.service';

// @Controller('products')
// export class ProductsController {
//   constructor(private readonly service: ProductsService) {}

//   @Post()
//   create(@Body() dto: any) {
//     return this.service.create(dto);
//   }

//   @Get()
//   findAll(@Query('search') search?: string) {
//     return this.service.findAll(search);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.service.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() dto: any) {
//     return this.service.update(id, dto);
//   }

//   @Delete(':id')
//   delete(@Param('id') id: string) {
//     return this.service.delete(id);
//   }
// }


