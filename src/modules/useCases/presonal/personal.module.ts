import { Module } from '@nestjs/common';
import { PersonalController } from './personal.controller';
import { PersonalServices } from './personal.service';

@Module({
  controllers: [PersonalController],
  providers: [PersonalServices],
})
export class PersonalModule {}
