import { Team } from './../../team/team.entity';
import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsDate, IsInt, IsNotEmpty, Min, Max } from 'class-validator';

@InputType()
export class MatchInput {
  @Field({ nullable: true })
  matchId?: string;

  @IsInt()
  @Min(0)
  @Max(300)
  @Field({ nullable: true })
  matchPoints?: number;

  @IsDate()
  @Field()
  dateMatch: Date;
}
