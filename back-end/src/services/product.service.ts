import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  public async getProducts() {
    const products = await this.prisma.product.findMany();

    return products;
  }

  public async createProduct(
    description: string,
    sellPrice: number,
    unit: string,
    code?: number,
  ) {
    await this.prisma.product.create({
      data: {
        code: code,
        description,
        sellPrice,
        unit,
      },
    });
  }
}
