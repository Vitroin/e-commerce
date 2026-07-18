import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from '@nestjs/config';
import devConfig from './config/env/dev.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User, userSchema } from './models/common/user.schema';
import { Admin, adminSchema } from './models/admin/admin.schema';
import { Seller, sellerSchema } from './models/seller/seller.schema';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [devConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=>({
        uri: configService.get('db').url,
      }),
    }),
    MongooseModule.forFeature([
      // Add your Mongoose models here
      {
        name: User.name,
        schema: userSchema,
        discriminators: [
          {
            name: Admin.name,
            schema: adminSchema,
          },
          {
            name: Seller.name,
            schema: sellerSchema,
          }
        ]
      }
    ]),
    AuthModule, 
    ProductModule, 
    BrandModule, 
    CategoryModule,
    ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
