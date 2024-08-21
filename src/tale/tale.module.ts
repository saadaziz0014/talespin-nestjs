import { Module } from '@nestjs/common';
import { TaleController } from './tale.controller';
import { TaleService } from './tale.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { constants } from 'src/constants';
import { PassportModule } from '@nestjs/passport';
import { taleProviders } from 'src/providers/tale.providers';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { userProviders } from 'src/providers/user.providers';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: constants.jwt_secret,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [TaleController],
  providers: [TaleService, ...taleProviders, ...userProviders, JwtStrategy]
})
export class TaleModule { }
