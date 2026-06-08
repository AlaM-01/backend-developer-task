import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { CreateShopDTO } from './dto/create-shop.dto';
import { ShopWithProductsDTO } from './dto/shop-with-products.dto';
import { ShopDTO } from './dto/shop.dto';
import { UpdateShopDTO } from './dto/update-shop.dto';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(JoiPipe) createShopDto: CreateShopDTO): Promise<ShopDTO> {
    return this.shopsService.create(createShopDto);
  }

  @Get()
  async findAll(
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
  ): Promise<ShopDTO[]> {
    return this.shopsService.findAll(Number(limit), Number(offset));
  }

  @Get('with-products')
  async findAllWithProducts(
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
  ): Promise<ShopWithProductsDTO[]> {
    return this.shopsService.findAllWithProducts(Number(limit), Number(offset));
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<ShopDTO> {
    return this.shopsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(JoiPipe) updateShopDto: UpdateShopDTO,
  ): Promise<ShopDTO> {
    return this.shopsService.update(id, updateShopDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.shopsService.delete(id);
  }
}