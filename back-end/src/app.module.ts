import { Module } from '@nestjs/common';
import { PrismaService } from './repository/prisma.service';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [PrismaService, ProductService],
})
export class AppModule {}
