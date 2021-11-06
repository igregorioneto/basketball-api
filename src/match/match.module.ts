import { TeamModule } from 'src/team/team.module';
import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchResolver } from './match.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match]), TeamModule],
  providers: [MatchService, MatchResolver],
  exports: [MatchService],
})
export class MatchModule {}
