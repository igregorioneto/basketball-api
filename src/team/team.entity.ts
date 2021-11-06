import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Match } from 'src/match/match.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'team_id' })
  @Field(() => ID)
  teamId: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
