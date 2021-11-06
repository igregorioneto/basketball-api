import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Team } from 'src/team/team.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'match_id' })
  @Field(() => ID, { nullable: true })
  matchId: string;

  @Column({ name: 'match_points', nullable: true })
  matchPoints?: number;

  @Column({ name: 'data_match', nullable: true })
  dateMatch: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Team, {
    eager: true,
  })
  @JoinTable({ name: 'teams_id' })
  teamsConnection: Promise<Team[]>;
}
