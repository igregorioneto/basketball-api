import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createConnection,
  createQueryBuilder,
  getConnection,
  getManager,
  getRepository,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Match } from './match.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  // Querys

  async findMatchById(id: string): Promise<Match> {
    return await this.matchRepository.findOne({
      where: { matchId: id },
      relations: ['teamsConnection'],
    });
  }

  async findAllMatchs(): Promise<Match[]> {
    return await this.matchRepository.find({
      relations: ['teamsConnection'],
    });
  }

  // select match_points from "match" m join teams_id ti on ti."teamTeamId"  = 1;
  /**
   * Busca e retorna os top 5 usuários que mais reconheceram.
   *
   * @param teamId ID do time.
   * @returns IDs dos top 7 partidas.
   */
  public async findAllMatchsParam(): Promise<Match[]> {
    const result = await this.matchRepository
      .createQueryBuilder('match')
      .select([
        'match.matchId as matchId',
        'match.matchPoints as matchPoints',
        'match.dateMatch as dateMatch',
      ])
      .groupBy('match.matchId')
      .getRawMany();
    return result;
  }

  // Mutations

  async createMatch(data: Match): Promise<Match> {
    const matchSave = await this.matchRepository.save(data);

    if (!matchSave) {
      throw new InternalServerErrorException('Problem creating a match');
    }

    return matchSave;
  }

  async updateMatch(data: Match): Promise<Match> {
    return await this.matchRepository.save(data);
  }

  async deleteMatch(id: string): Promise<boolean> {
    const match = await this.matchRepository.delete(id);
    if (!match) {
      return false;
    }
    return true;
  }
}
