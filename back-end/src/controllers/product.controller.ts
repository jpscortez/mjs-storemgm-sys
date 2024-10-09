import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async getProducts() {
    return await this.service.getProducts();
  }

  @Post()
  async createProduct(@Body() body: any) {
    const { description, sellPrice, unit } = body;
    await this.service.createProduct(description, sellPrice, unit);
  }

  @Post('upload')
  async uploadProduct(@Body() body: any) {
    const { description, sellPrice, unit, code } = body;
    await this.service.createProduct(description, sellPrice, unit, code);
  }
}
